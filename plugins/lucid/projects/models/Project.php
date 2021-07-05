<?php namespace Lucid\Projects\Models;

use Model;

/**
 * Model
 */
class Project extends Model
{
    use \Winter\Storm\Database\Traits\Validation;
    

    /**
     * @var string The database table used by the model.
     */
    public $table = 'lucid_projects_projects';

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
    public $belongsTo = [
        'category' => 'Lucid\Projects\Models\Category'
    ];
}
