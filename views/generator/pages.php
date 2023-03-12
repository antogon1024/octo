
<div class="row">
    <div class="col-lg-3"></div>
    <div class="col-lg-6 ant-wrap">
        <div class="header">
            <img class="header-img" src="/web/img/header/<?=$page->user_id?>/<?=$page->header?>" alt="header">
        </div>

        <label class="label-avatar3" for="avatarUploader">
            <img class="avatar-img3" src="/web/img/avatar/<?=$page->user_id?>/<?=$page->avatar?>" alt="avatar">
        </label>

        <h3 class="pg-caption"><?=$page->caption?></h3>

        <?=$page->page?>
    </div>
    <div class="col-lg-3"></div>
</div>
<input id="bgcolor" type="hidden" value="<?=$page->bgcolor?>">
<div name="getsetting" style="display: none;"><?= $page->setting ?></div>
