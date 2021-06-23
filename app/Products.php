<?php

namespace App;

use App\Library\Format;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;
use Illuminate\Support\Arr;

class Products extends Model
{
    protected $collection = 'products';
    protected $fillable = [
        'description',
        'name', 'sale_value', 'quantity'
    ];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }


    public function category()
    {
        return $this->belongsTo(Categories::class);
    }


    public function subcategory()
    {
        return $this->belongsTo(Subcategories::class);
    }

    /**
     * Mutator para data
     *
     * @param [type] $date
     * @return string
     */
    public function getCreatedAtAttribute($date)
    {
        return Carbon::parse($date)->format('d/m/Y H:i');
    }

    public function getSaleFormatValueAttribute()
    {
        return  Format::money($this->attributes['sale_value']);
    }

    public function getSaleFormatValueMoneyAttribute()
    {
        return  Format::moneyWithoutSymbol($this->attributes['sale_value']);
    }

    public function getSaleValueAttribute()
    {
        return str_replace(".", ',', $this->attributes['sale_value']);
    }

    public function getShortDescription()
    {
        $qtd = strlen($this->attributes['description']);
        if ($qtd >= 90) {
            return substr($this->attributes['description'], 0, 90) . "...";
        }
    }

    public function getFullNameValueAttribute()
    {
        $name = $this->attributes['name'];

        $quant = Arr::get($this->attributes, 'quantity');
        if (!$quant) {
            $quant = 0;
        }
        $name .=  ' (qtd:' . $quant . ') ';



        return $name;
    }
}
