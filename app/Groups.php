<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Groups extends Model
{
    protected $collection = 'groups';
    protected $fillable = ['name'];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }


    public function categories()
    {
        return $this->hasMany(Categories::class, 'group_id');
    }
}
