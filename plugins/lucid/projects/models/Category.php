<?php namespace Lucid\Projects\Models;

use Model;

/**
 * Model
 */
class Category extends Model
{
    use \Winter\Storm\Database\Traits\Validation;
    

    /**
     * @var string The database table used by the model.
     */
    public $table = 'lucid_projects_categories';

    /**
     * @var array Validation rules
     */
    public $rules = [
    ];


    // Attach images
    public $attachOne = [
        'thumbnail' => 'System\Models\File',
        'featured_image' => 'System\Models\File'
    ];


    // Relations
    public $hasMany = [
        'projects' => 'Lucid\Projects\Models\Project'
    ];
}
