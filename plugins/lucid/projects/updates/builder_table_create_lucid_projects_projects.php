<?php namespace Lucid\Projects\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableCreateLucidProjectsProjects extends Migration
{
    public function up()
    {
        Schema::create('lucid_projects_projects', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->string('title')->nullable();
            $table->string('slug')->nullable();
            $table->text('excerpt')->nullable();
            $table->text('description')->nullable();
            $table->boolean('is_published')->nullable();
            $table->boolean('is_promoted')->nullable();
            $table->integer('category_id')->nullable()->unsigned();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('lucid_projects_projects');
    }
}
