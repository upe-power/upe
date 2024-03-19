var utils = {
    xor: function (a, b) {
        return (a || b) && !(a && b);
    },
    getMatches: function (str, re) {
        var matches = [];
        var match;
        do {
            match = re.exec(str);
            if (match) {
                matches.push(match);
            }
        } while (match);
        return matches;
    },
    getSubMatch: function (str, re) {
        var subMatch = null;
        var matches = re.exec(str);
        if (matches && matches.length > 1) {
            subMatch = matches[1];
        }
        return subMatch;
    },
    highlightKeyphrase: function (text, keyphrase) {
        if (keyphrase) {
            return utils.htmlEncode(text).replace(
                new RegExp(utils.escapeRegex(utils.htmlEncode(keyphrase)), 'g'),
                '<span class="matched_keyphrase">$&</span>'
            );
        } else {
            return utils.htmlEncode(text);
        }
    },
    htmlEncode: function (value) {
        return $('<div/>').text(value).html();
    },
    removeHtml: function (value) {
        return $('<div>'+value+'</div>').text();
    },
    escapeRegex: function (str) {
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    },
    splitAndRemoveEmpty: function (str, delimiter) {
        delimiter = delimiter || ',';
        return $.grep($.map(str.split(delimiter), function (e) { return $.trim(e); }), function (e) { return e !== ''; });
    },
    removeDuplicate: function (arr) {
        var uniqArr = [];
        $.each(arr, function(i, el) {
            if ($.inArray(el, uniqArr) === -1) {
                uniqArr.push(el);
            }
        });
        return uniqArr;
    },
    isInteger: function (value) {
        return $.isNumeric(value) && +value === Math.floor(value);
    },
    validators: {
        required: function (value) {
            return value !== '';
        },
        email: function (value) {
            return value === '' || utils.isEmail(value);
        },
        emails: function (value) {
            return utils.isEmailList(value);
        }
    },
    isEmail: function (value) {
        return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value);
    },
    isEmailList: function (value) {
        if (value !== '') {
            var emails = value.split(';');
            for (var i = 0, length = emails.length; i < length; i++) {
                if (!utils.isEmail($.trim(emails[i]))) {
                    return false;
                }
            }
        }
        return true;
    },
    isDate: function (value) {
        return /((^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(10|12|0?[13578])([-\/\._])(3[01]|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(11|0?[469])([-\/\._])(30|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(0?2)([-\/\._])(2[0-8]|1[0-9]|0?[1-9])$)|(^([2468][048]00)([-\/\._])(0?2)([-\/\._])(29)$)|(^([3579][26]00)([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][0][48])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][0][48])([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][2468][048])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][2468][048])([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][13579][26])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][13579][26])([-\/\._])(0?2)([-\/\._])(29)$))/.test(value);
    },
    setQs: function (url, key, value) {
        var re = new RegExp('([?&])' + key + '=.*?(&|$)', 'i');
        var separator = url.indexOf('?') !== -1 ? '&' : '?';
        if (url.match(re)) {
            return url.replace(re, '$1' + encodeURIComponent(key) + '=' + encodeURIComponent(value) + '$2');
        }
        else {
            return url + separator + encodeURIComponent(key) + '=' + encodeURIComponent(value);
        }
    },
    formPostTo: function (url, data) {
        utils.formSubmitTo(url, data, 'post', null);
    },
    formSubmitTo: function (url, data, method, target) {
        var form = document.createElement('form');
        form.setAttribute('method', method === 'post' ? 'post' : 'get');
        form.setAttribute('action', url);
        if (target) {
            form.setAttribute('target', target);
        }
        for(var key in data) {
            if(data.hasOwnProperty(key)) {
                var values = $.isArray(data[key]) ? data[key] : [data[key]];
                for (var i = 0; i < values.length; i++) {
                    var hiddenField = document.createElement('input');
                    hiddenField.setAttribute('type', 'hidden');
                    hiddenField.setAttribute('name', key);
                    hiddenField.setAttribute('value', values[i]);
                    form.appendChild(hiddenField);
                }
             }
        }
        document.body.appendChild(form);
        form.submit();
    },
    refreshCaptchaImage: function (imageElemId) {
        var imageElem = document.images[imageElemId];
        if (imageElem == undefined) {
            return;
        }
        imageElem.src = imageElem.src.split('?')[0] + '?r=' + new Date().getTime();
    },
    social: {
        twitThis: function () {
            window.open('https://twitter.com/intent/tweet?url=' +
                        encodeURIComponent(document.title) + ' ' + encodeURIComponent(location.href),
                        '_blank', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
        },
        fbShareThis: function () {
            window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(location.href),
                        '_blank', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
        },
        plurkShareThis: function () {
            window.open('http://www.plurk.com/?qualifier=shares&status=' +
                        encodeURIComponent(location.href) + ' (' + encodeURIComponent(document.title) + ')',
                        '_blank', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
        },
        gplusShareThis: function () {
            window.open('https://plus.google.com/share?url=' + encodeURIComponent(location.href),
                        '_blank', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
        },
        sinaShareThis: function () {
            window.open('http://service.weibo.com/share/share.php?url=' + encodeURIComponent(location.href) +
                                                                '&title=' + encodeURIComponent(document.title),
                        '_blank', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
        },
        lineThis: function () {
            window.open('http://line.me/R/msg/text/?' +
                        encodeURIComponent(document.title) + '%0D%0A' + encodeURIComponent(location.href));
        },
        linkedInShareThis: function () {
            window.open('http://www.linkedin.com/shareArticle?mini=true&title=' + encodeURIComponent(document.title) + 
                                                             '&url=' + encodeURIComponent(location.href));
        }
    }
};