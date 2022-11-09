<?php

namespace app\models;

use app\components\SimpleImage;
use yii\db\ActiveRecord;
use yii\helpers\FileHelper;
use Yii;

class Page extends ActiveRecord
{
    //public $header2;

    public static function tableName()
    {
        return 'cpg_page';
    }

    public function saveHeader()
    {
        //echo '<pre>';print_r($this);exit;
        $name = (is_object($this->header)) ? 'header' : 'avatar';
        $ftype = $this->$name->extension;
        $nameFile = uniqid() . '.' . $ftype;
        $dir = Yii::getAlias('@app') . "/web/img/$name/". $this->user_id;

        $this->saveFile($nameFile, $ftype, $dir, $name);

        $this->$name = $nameFile;
        $this->save(false);
    }

    private function saveFile($nameFile, $ftype, $dir, $name){
        if($ftype == 'png' || $ftype == 'jpeg' || $ftype == 'jpg'){
            FileHelper::removeDirectory($dir);
            if(!is_dir($dir)){
                mkdir($dir);
            }

            $path = $dir . '/' . $nameFile;
            $img = $this->$name->tempName;
            $post = Yii::$app->request->post();

            $img = ($ftype == 'png') ? imagecreatefrompng($img) : imagecreatefromjpeg($img);
            $im2 = imagecrop($img, ['x' => $post['x'], 'y' => $post['y'], 'width' => $post['w'], 'height' => $post['h']]);

            if ($im2 !== FALSE) {
                if($ftype == 'png'){
                    imagepng($im2, $path);
                }else{
                    imagejpeg($im2, $path);
                }
                imagedestroy($im2);
            }

            $ar = getimagesize ($path);
            if($name == 'header'){
                $width = 503;
                $height = 160;
            }else{
                $width = 160;
                $height = 160;
            }

            if($ar[0] > $width){
                $image = new SimpleImage();
                $image->load($path);
                $image->resize($width, $height);
                $image->save($path);
            }
        }
    }

}