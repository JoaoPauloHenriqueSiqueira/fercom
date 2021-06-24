<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class CategoriesTableSeeder extends Seeder
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
                "name" => "Cremes de proteção",
                "group_id" => 1,
                "created_at" => Carbon::now(),
                "updated_at" => Carbon::now(),
            ],
            [
                "id" => 2,
                "company_id" => 1,
                "name" => "Proteção para a cabeça",
                "group_id" => 1,
                "created_at" => Carbon::now(),
                "updated_at" => Carbon::now(),
            ], [
                "id" => 3,
                "company_id" => 1,
                "name" => "Proteção facial",
                "group_id" => 1,
                "created_at" => Carbon::now(),
                "updated_at" => Carbon::now(),
            ]
        ];

        foreach ($data as $row) {
            $tax = DB::table('categories')->find($row['id']);

            if (!$tax) {
                DB::table('categories')->insert($row);
            }
        }
    }
}
