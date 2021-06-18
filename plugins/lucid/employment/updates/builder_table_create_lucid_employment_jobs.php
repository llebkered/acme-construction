<?php namespace Lucid\Employment\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateLucidEmploymentJobs extends Migration
{
    public function up()
    {
        Schema::create('lucid_employment_jobs', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->string('title')->nullable();
            $table->string('slug')->nullable();
            $table->text('excerpt')->nullable();
            $table->text('content')->nullable();
            $table->dateTime('expiry')->nullable();
            $table->boolean('is_published')->nullable();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('lucid_employment_jobs');
    }
}
