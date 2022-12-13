<?php

//echo phpinfo();exit;
use yii\widgets\ActiveForm;
?>

<!--<form action="handler.php">
    <p>Укажите почтовые адреса через запятую:</p>
    <p><input type="email" name="email" required multiple></p>
    <p><input type="submit" value="Отправить"></p>
</form>-->

<!--<form enctype="multipart/form-data" action="upload.php" method="post">
    <input name="file[]" type="file" />
    <button class="add_more">Add More Files</button>
    <input type="button" id="upload" value="Upload File" />
</form>-->



<form enctype='multipart/form-data' method='POST' action=''>
    <input type='file' name='files[]' multiple>
    <button type='submit'>Submit</button>
</form>

<br>
<br>
<script>
    /*$(document).ready(function(){
        $('.add_more').click(function(e){
            e.preventDefault();
            $(this).before("<input name='file[]' type='file' />");
        });
    });*/

</script>




