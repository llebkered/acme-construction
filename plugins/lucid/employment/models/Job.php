<?php namespace Lucid\Employment\Models;

use Model;

/**
 * Model
 */
class Job extends Model
{
    use \Winter\Storm\Database\Traits\Validation;
    

    /**
     * @var string The database table used by the model.
     */
    public $table = 'lucid_employment_jobs';

    /**
     * @var array Validation rules
     */
    public $rules = [
    ];


    // Attach Postition description file to Job Vacancy
    public $attachOne = [
        'pd' => 'System\Models\File'
    ];
}
