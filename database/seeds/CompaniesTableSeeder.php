<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class CompaniesTableSeeder extends Seeder
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
                "name" => "FERCOM",
                "city" => "São Manuel",
                "cep" => "18650-000",
                "address" => "Av. Jose Horacio Melao",
                "phone" =>  "(14) 3841-1035",
                "whatsapp" =>  "https://api.whatsapp.com/send?phone=5514996580969",
                "facebook" => "https://www.facebook.com/fercomferramentas",
                "instagram" => "https://www.instagram.com/fercomsm/",
                "mail" => "fercomsm@fercomsm.com.br",
                "long" => "-48.5726922",
                "lat" => "-22.739671",
                "created_at" => Carbon::now(),
                "updated_at" => Carbon::now(),
            ]
        ];

        foreach ($data as $row) {
            $tax = DB::table('companies')->find($row['id']);

            if (!$tax) {
                DB::table('companies')->insert($row);
            }
        }
    }
}
