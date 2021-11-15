<?php

namespace App\Http\Controllers;

use App\Company;
use App\Groups;
use App\Categories;
use App\Products;
use App\Subcategories;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;

class HomeController extends Controller
{

    protected $carbon;

    /**
     * Construct function
     *
     * @param FlowService $service
     */
    public function __construct(
        Carbon $carbon
    ) {
        $this->carbon = $carbon;
    }


    public function index(Request $request)
    {
        try {
            $companyId = ENV('COMPANY');
            $company = Company::find($companyId);

            $breadcrumbs = $this->breadcrumb($request);
            $description = $this->description($request);

            $groups = $this->groups();
            $products = $this->products($request);

            $subCategories = $this->subcategories($request);

            $groupId = $request->query('group');
            $categoryId = $request->query('category');
            
            return view(
                'pages.home',
                [
                    "groups" => $groups,
                    "breadcrumbs" => $breadcrumbs,
                    "description" => $description,
                    "company" => $company,
                    "products" => $products,
                    "group" => $groupId,
                    "category" => $categoryId,
                    "subcategories" => $subCategories
                ]
            );
        } catch (Exception $e) {
            return $e->getMessage();
        }
    }

    public function products($request)
    {
        $groupId = $request->query('group');
        $categoryId = $request->query('category');
        $subCategoryId = $request->query('subcategory');
        $companyId = ENV('COMPANY');

        $products = [];

        if ($groupId && !$categoryId && !$subCategoryId) {
            $categories = Categories::where("company_id", $companyId)->where("group_id", $groupId)->get();

            $categoriesSearch = [];
            foreach ($categories as $c) {
                array_push($categoriesSearch, $c->id);
            }

            $products = Products::where('company_id', $companyId)->whereIn("category_id", $categoriesSearch)->orderBy('created_at', 'DESC')->paginate(10);
        }

        if ($groupId && $categoryId && !$subCategoryId) {
            $products = Products::where('company_id', $companyId)->where("category_id", $categoryId)->orderBy('created_at', 'DESC')->paginate(10);
        }

        if ($groupId && $categoryId && $subCategoryId) {
            $products = Products::where('company_id', $companyId)->where("category_id", $categoryId)->where("subcategory_id", $subCategoryId)->orderBy('created_at', 'DESC')->paginate(10);
        }

        if (empty($products)) {
            $products = Products::where('company_id', $companyId)->orderBy('created_at', 'DESC')->paginate(10);
        }

        return $products;
    }

    public function subcategories($request)
    {
        $groupId = $request->query('group');
        $categoryId = $request->query('category');
        $subCategoryId = $request->query('subcategory');;
       
        $companyId = ENV('COMPANY');

        $products = [];

        $links = [];

        if ($groupId && !$categoryId) {
            $categories = Categories::where("company_id", $companyId)->where("group_id", $groupId)->get();
            foreach($categories as $category){
                array_push($links, ["name"=> $category->name,"link" => "?group=$groupId&category=$category->id"]);
            }
        }

        if ($groupId && $categoryId) {
            $subcategories = Subcategories::where("company_id", $companyId)->where("category_id", $categoryId)->get();
            foreach($subcategories as $subcategory){
                array_push($links, ["name"=> $subcategory->name,"link" => "?group=$groupId&category=$categoryId&subcategory=$subcategory->id"]);
            }    
        }

        return $links;
    }

    public function detail(Request $request)
    {
        try {
            $companyId = ENV('COMPANY');
            $company = Company::find($companyId);

            $breadcrumbs = $this->breadcrumb($request);
            $description = $this->description($request);
            $groups = $this->groups();

            $productId = $request->query('product');

            if (!$productId) {
                return redirect()->route('home')->with("message", "Nenhum produto encontrado");
            }

            $product = Products::where('company_id', $companyId)->where("product_code", $productId)->first();

            return view(
                'pages.detail',
                [
                    "groups" => $groups,
                    "breadcrumbs" => $breadcrumbs,
                    "description" => $description,
                    "company" => $company,
                    "product" => $product
                ]
            );
        } catch (Exception $e) {
            return $e->getMessage();
        }
    }

    public function cart(Request $request)
    {
        try {
            $companyId = ENV('COMPANY');
            $company = Company::find($companyId);

            $breadcrumbs = $this->breadcrumb($request);
            $description = $this->description($request);
            $groups = $this->groups();
    
            return view(
                'pages.shopping-cart',
                [
                    "groups" => $groups,
                    "breadcrumbs" => $breadcrumbs,
                    "description" => $description,
                    "company" => $company,
                ]
            );
        } catch (Exception $e) {
            return $e->getMessage();
        }
    }

    private function groups()
    {
        $companyId = ENV('COMPANY');
        $groups = Groups::where("company_id", $companyId)->get();

        $groupsArray = [];
        foreach ($groups as $group) {

            $newGroup = [
                "id" => $group->id,
                "name" => "$group->name",
                "icon" => $group->icon,
                "categories" => []
            ];

            foreach ($group->categories as $category) {
                array_push($newGroup["categories"], ["id" => $category->id, "name" => $category->name, "subcategories" => $category->subcategories]);
            }

            array_push($groupsArray, $newGroup);
        }


        return $groupsArray;
    }


    private function breadcrumb($request)
    {
        $companyId = ENV('COMPANY');
        $groupId = $request->query('group');
        $categoryId = $request->query('category');
        $subcategoryId = $request->query('subcategory');

        $productId = $request->query('product');

        $breadcrumbs = ["id" => false, "name" => 'Início', "subname" => "Todos os produtos"];

        if ($productId) {
            $product = Products::where("company_id", $companyId)->where("product_code", $productId)->first();
            $category = Categories::where("company_id", $companyId)->where("id", $product->category_id)->first();
            $group = Groups::where("company_id", $companyId)->where("id", $category->group_id)->first();
            $subcategory = Subcategories::where("company_id", $companyId)->where("id", $product->subcategory_id)->first();

            $breadcrumbs = ["id" => "$group->id&category=$category->id&subcategory=$subcategory->id", "name" =>  $group->name, "subname" => "$category->name / $subcategory->name"];
        }

        if ($groupId && !$categoryId) {
            $group = Groups::where("company_id", $companyId)->where("id", $groupId)->first();
            if ($group) {
                $breadcrumbs = ["id" => $groupId, "name" =>  $group->name, "subname" => "Todos os produtos"];
            }
        }

        if ($groupId && $categoryId && !$subcategoryId) {
            $group = Groups::where("company_id", $companyId)->where("id", $groupId)->first();
            $category = Categories::where("company_id", $companyId)->where("id", $categoryId)->first();

            if ($group) {
                $breadcrumbs = ["id" => "$groupId", "name" =>  $group->name, "subname" => $category->name];
            }
        }

        if ($groupId && $categoryId && $subcategoryId) {
            $group = Groups::where("company_id", $companyId)->where("id", $groupId)->first();
            $category = Categories::where("company_id", $companyId)->where("id", $categoryId)->first();
            $subcategory = Subcategories::where("company_id", $companyId)->where("id", $subcategoryId)->first();

            if ($group) {
                $breadcrumbs = ["id" => "$groupId&category=$categoryId", "name" =>  $group->name, "subname" => "$category->name / $subcategory->name"];
            }
        }

        return $breadcrumbs;
    }

    private function description($request)
    {
        $companyId = ENV('COMPANY');
        $groupId = $request->query('group');
        $categoryId = $request->query('category');
        $subcategoryId = $request->query('subcategory');

        $description = ["name" => 'Nossos Produtos', "description" => ""];

        if ($groupId && !$categoryId) {
            $group = Groups::where("company_id", $companyId)->where("id", $groupId)->first();
            if ($group) {
                $description = ["name" =>  $group->name, "description" => ""];
            }
        }

        if ($groupId && $categoryId && !$subcategoryId) {
            $group = Groups::where("company_id", $companyId)->where("id", $groupId)->first();
            $category = Categories::where("company_id", $companyId)->where("id", $categoryId)->first();

            if ($group) {
                $description = ["name" =>  $category->name, "description" => $category->description];
            }
        }

        if ($groupId && $categoryId && $subcategoryId) {
            $group = Groups::where("company_id", $companyId)->where("id", $groupId)->first();
            $category = Categories::where("company_id", $companyId)->where("id", $categoryId)->first();
            $subcategory = Subcategories::where("company_id", $companyId)->where("id", $subcategoryId)->first();

            if ($group) {
                $description = ["name" =>  $subcategory->name, "description" => "$category->description"];
            }
        }

        return $description;
    }
}
