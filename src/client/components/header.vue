<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-3">
                <div class="logo">什么值得买</div>
            </div>
            <div class="col-sm-6 search">
                <div class="input-group">
                    <input type="text" class="form-control">
                    <span class="input-group-btn">
                        <button class="btn btn-default" type="button">
                            <i class="fa fa-search" aria-hidden="true"></i>
                        </button>
                    </span>
                </div>
                <div class="hot-search">
                    <span>热门搜索</span>
                    <span>零食</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    padding-top: 20px;
    padding-bottom: 20px;
}
.logo {
    font-size: 28px;
    color: #f04848;
}
.input-group {
    & input {
        border: solid 2px #f04848;

        &:hover,
        &:focus {
            outline: none;
            box-shadow: none;
        }
    }
    & .btn {
        font-size: 13px;
        color: #fff;
        background: #f04848;
        border: solid 2px #f04848;
        border-left: solid 1px #f04848;

        &:hover,
        &:focus {
            outline: none;
            box-shadow: none;
        }
    }
}
.hot-search {
    margin: 4px 0;
    font-size: 12px;
}
</style>
