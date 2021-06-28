<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('company_id')->unsigned();
            $table->string('name');
            $table->longText('description')->nullable(true);	
            $table->float('sale_value',10,2)->unsigned()->nullable(false)->default(0);
            $table->integer('quantity')->nullable(true);
            $table->integer('category_id')->unsigned();
            $table->integer('subcategory_id')->unsigned();
            $table->integer('product_code')->unsigned();
            $table->integer('weight')->nullable(true);
            $table->integer('height')->nullable(true);
            $table->integer('width')->nullable(true);
            $table->integer('length')->nullable(true);
            $table->timestamps();
        });

        Schema::table('products', function ($table) {
            $table->foreign('subcategory_id')->references('id')->on('subcategories')->onDelete('cascade');
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');
            $table->foreign('company_id')->references('id')->on('companies')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
}
