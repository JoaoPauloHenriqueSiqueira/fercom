<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class GroupsTableSeeder extends Seeder
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
                "name" => "EPI'S",
                "icon" => "headset",
                "created_at" => Carbon::now(),
                "updated_at" => Carbon::now(),
            ]
        ];

        foreach ($data as $row) {
            $tax = DB::table('groups')->find($row['id']);

            if (!$tax) {
                DB::table('groups')->insert($row);
            }
        }
    }
}
