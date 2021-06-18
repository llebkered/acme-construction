<?php namespace Lucid\Employment\Controllers;

use Backend\Classes\Controller;
use BackendMenu;

class Job extends Controller
{
    public $implement = [        'Backend\Behaviors\ListController',        'Backend\Behaviors\FormController'    ];
    
    public $listConfig = 'config_list.yaml';
    public $formConfig = 'config_form.yaml';

    public function __construct()
    {
        parent::__construct();
        BackendMenu::setContext('Lucid.Employment', 'main-menu-item');
    }
}
