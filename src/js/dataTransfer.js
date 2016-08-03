;
(function(ns, win) {
    var domainIdKey = 'd';

    class DataTransfer {
        constructor(scope, win) {
            this.parent = scope;
            this._win = win;
        }

        get win() {
            return this._win || window;
        }

        setDomainId(domainId) {
            this.updateSearchData({
                [domainIdKey]: domainId
            });
        }
        getDomainId(domainId) {
            return this.getSearchData(domainIdKey);
        }

        getSearchData(key = null) {
            var urlObj = new ns.Url(this.win.location.href);
            return urlObj.getSearchData(key);
        }

        updateSearchData(data) {
            var urlObj = new ns.Url(this.win.location.href);
            urlObj.updateSearchData(data);
            history.replaceState(null, this.win.title, urlObj.getUrl());
        }

        setSearchData(data) {
            var urlObj = new ns.Url(this.win.location.href);
            urlObj.setSearchData(data);
            history.replaceState(null, this.win.title, urlObj.getUrl());
        }
    }

    if(!ns.DataTransfer) {
        ns.DataTransfer = DataTransfer;
    }

    if(!ns.dataTransfer) {
        ns.dataTransfer = new DataTransfer(ns, win);
    }

    return void(0);

})(window, window); // TODO: 建议此处传入自己的名称空间
