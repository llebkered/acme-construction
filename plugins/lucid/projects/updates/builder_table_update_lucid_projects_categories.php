<?php namespace Lucid\Projects\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateLucidProjectsCategories extends Migration
{
    public function up()
    {
        Schema::table('lucid_projects_categories', function($table)
        {
            $table->renameColumn('decription', 'description');
        });
    }
    
    public function down()
    {
        Schema::table('lucid_projects_categories', function($table)
        {
            $table->renameColumn('description', 'decription');
        });
    }
}
