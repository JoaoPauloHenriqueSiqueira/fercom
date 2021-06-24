<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class SubcategoriesTableSeeder extends Seeder
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
                "category_id" => 1,
                "name" => "Creme proteção para mãos",
                "created_at" => Carbon::now(),
                "updated_at" => Carbon::now(),
            ],
            [
                "id" => 2,
                "company_id" => 1,
                "category_id" => 1,
                "name" => "Desengraxante para mãos",
                "created_at" => Carbon::now(),
                "updated_at" => Carbon::now(),
            ],
            [
                "id" => 3,
                "company_id" => 1,
                "category_id" => 1,
                "name" => "Protetor Solar",
                "created_at" => Carbon::now(),
                "updated_at" => Carbon::now(),
            ],
            [
                "id" => 4,
                "company_id" => 1,
                "category_id" => 1,
                "name" => "Capacete de segurança",
                "created_at" => Carbon::now(),
                "updated_at" => Carbon::now(),
            ]
        ];

        foreach ($data as $row) {
            $tax = DB::table('subcategories')->find($row['id']);

            if (!$tax) {
                DB::table('subcategories')->insert($row);
            }
        }
    }
}
