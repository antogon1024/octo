<?php

namespace app\models;

use app\components\SimpleImage;
use yii\db\ActiveRecord;
use Yii;
use yii\helpers\Json;

class Slider extends ActiveRecord
{

    //public $image;
    public $width;
    public $height;

    public static function tableName()
    {
        return 'cpg_slider';
    }

    public function saveImage($id, $arImage)
    {
        $nameFile = uniqid() . '.png';
        $dir = Yii::getAlias('@app') . "/web/img/slider/" . $id;

        $this->saveFile($nameFile, $dir, $arImage);

        $this->user_id = Yii::$app->user->identity->id;
        $this->page_id = $id;
        $this->image = $nameFile;
        //$this->image = 'ddd';
        $this->save(false);

        $data = ['name' => $nameFile, 'dir' => "/web/img/slider/" . $id];
        return Json::encode($data);
    }

    private function saveFile($nameFile, $dir, $arImage)
    {
        if (!is_dir($dir)) {
            mkdir($dir);
        }

        $path = $dir . '/' . $nameFile;

        $image = new SimpleImage();
        $image->load($arImage['tmp_name']);
        $image->resize($this->width, $this->height);
        $image->save($path);
    }

}