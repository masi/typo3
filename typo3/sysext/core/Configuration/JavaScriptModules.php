<?php

return [
    'dependencies' => [],
    'imports' => [
        '@typo3/core/' => [
            'path' => 'EXT:core/Resources/Public/JavaScript/',
            'exclude' => [
                'EXT:core/Resources/Public/JavaScript/Contrib/',
            ],
        ],
        'autosize' => 'EXT:core/Resources/Public/JavaScript/Contrib/autosize.js',
        'bootstrap' => 'EXT:core/Resources/Public/JavaScript/Contrib/bootstrap.js',
        'cropperjs' => 'EXT:core/Resources/Public/JavaScript/Contrib/cropperjs.js',
        'css-tree' => 'EXT:core/Resources/Public/JavaScript/Contrib/css-tree.js',
        'flatpickr' => 'EXT:core/Resources/Public/JavaScript/Contrib/flatpickr/flatpickr.min.js',
        'flatpickr/' => 'EXT:core/Resources/Public/JavaScript/Contrib/flatpickr/',
        'interactjs' => 'EXT:core/Resources/Public/JavaScript/Contrib/interact.js',
        'jquery' => 'EXT:core/Resources/Public/JavaScript/Contrib/jquery.js',
        'jquery/' => 'EXT:core/Resources/Public/JavaScript/Contrib/jquery/',
        '@lit/reactive-element' => 'EXT:core/Resources/Public/JavaScript/Contrib/@lit/reactive-element/reactive-element.js',
        '@lit/reactive-element/' => 'EXT:core/Resources/Public/JavaScript/Contrib/@lit/reactive-element/',
        '@lit/task' => 'EXT:core/Resources/Public/JavaScript/Contrib/@lit/task/index.js',
        '@lit/task/' => 'EXT:core/Resources/Public/JavaScript/Contrib/@lit/task/',
        'lit' => 'EXT:core/Resources/Public/JavaScript/Contrib/lit/index.js',
        'lit/' => 'EXT:core/Resources/Public/JavaScript/Contrib/lit/',
        'lit-element' => 'EXT:core/Resources/Public/JavaScript/Contrib/lit-element/index.js',
        'lit-element/' => 'EXT:core/Resources/Public/JavaScript/Contrib/lit-element/',
        'lit-html' => 'EXT:core/Resources/Public/JavaScript/Contrib/lit-html/lit-html.js',
        'lit-html/' => 'EXT:core/Resources/Public/JavaScript/Contrib/lit-html/',
        'luxon' => 'EXT:core/Resources/Public/JavaScript/Contrib/luxon.js',
        'nprogress' => 'EXT:core/Resources/Public/JavaScript/Contrib/nprogress.js',
        'sortablejs' => 'EXT:core/Resources/Public/JavaScript/Contrib/sortablejs.js',
        'tablesort.dotsep.js' => 'EXT:core/Resources/Public/JavaScript/Contrib/tablesort.dotsep.js',
        'tablesort.number.js' => 'EXT:core/Resources/Public/JavaScript/Contrib/tablesort.number.js',
        'tablesort' => 'EXT:core/Resources/Public/JavaScript/Contrib/tablesort.js',
        'taboverride' => 'EXT:core/Resources/Public/JavaScript/Contrib/taboverride.js',
    ],
];
