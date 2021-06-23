<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Categories extends Model
{
    protected $collection = 'categories';
    protected $fillable = ['name'];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function products()
    {
        return $this->belongsTo(Products::class);
    }

    public function subcategories()
    {
        return $this->hasMany(Subcategories::class, 'category_id');
    }
}
