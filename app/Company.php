<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    protected $collection = 'companies';
    protected $fillable = ['name', 'city','cep','address', 'long','lat','phone','whatsapp','facebook','instagram'];
}
