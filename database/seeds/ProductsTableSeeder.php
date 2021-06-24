<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class ProductsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            [
                "id" => 1,
                "company_id" => 1,
                "name" => "JUGULAR CAPACETE",
                "description" => "É importante questionar o quanto a valorização de fatores subjetivos garante a contribuição de um grupo importante na determinação das diversas correntes de pensamento.",
                "sale_value" => 73.08,
                "quantity" => 1,
                "category_id" => 2,
                "subcategory_id" => 4,
                'product_code' => 2242,
                "created_at" => Carbon::now(),
                "updated_at" => Carbon::now(),
            ],
            [
                "id" => 2,
                "company_id" => 1,
                "name" => "HELP HAND G-3 200 G BISNAGA HENLAU",
                "description" => "É importante questionar o quanto a valorização de fatores subjetivos garante a contribuição de um grupo importante na determinação das diversas correntes de pensamento.",
                "sale_value" => 70.07,
                "quantity" => 3,
                "category_id" => 1,
                "subcategory_id" => 1,
                'product_code' => 5749,
                "created_at" => Carbon::now(),
                "updated_at" => Carbon::now(),
            ],
            [
                "id" => 3,
                "company_id" => 1,
                "name" => "TOUCA ARABE PARA SOLDADOR BRIM CINZA",
                "description" => "",
                "sale_value" => 77.94,
                "quantity" => 9,
                "category_id" => 2,
                "subcategory_id" => 4,
                'product_code' => 7655,
                "created_at" => Carbon::now(),
                "updated_at" => Carbon::now(),
            ]
        ];

        foreach ($data as $row) {
            $tax = DB::table('products')->find($row['id']);

            if (!$tax) {
                DB::table('products')->insert($row);
            }
        }
    }
}
