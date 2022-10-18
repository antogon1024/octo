<?php

/* @var $this yii\web\View */
/* @var $name string */
/* @var $message string */
/* @var $exception Exception */

use yii\helpers\Html;

$this->title = $name;
?>
<!-- Content -->
<div class="container">
    <a class="position-absolute top-0 left-0 right-0" href="index.html">
        <img class="avatar avatar-xl avatar-4by3 avatar-centered" src="/template/svg/logos/logo.svg" alt="Image Description">
    </a>

    <div class="footer-height-offset d-flex justify-content-center align-items-center flex-column">
        <div class="row align-items-sm-center w-100">
            <div class="col-sm-6">
              <div class="text-center text-sm-right mr-sm-4 mb-5 mb-sm-0">
                <img class="w-60 w-sm-100 mx-auto" src="/template/svg/illustrations/think.svg" alt="Image Description" style="max-width: 15rem;">
              </div>
            </div>

            <div class="col-sm-6 col-md-4 text-center text-sm-left">
              <h1 class="display-1 mb-0"><?= Html::encode($this->title) ?></h1>
              <p class="lead"><?= nl2br(Html::encode($message)) ?></p>
              <a class="btn btn-primary" href="javascript:;">Reload page</a>
            </div>
        </div>
        <!-- End Row -->
    </div>
</div>
<!-- End Content -->
