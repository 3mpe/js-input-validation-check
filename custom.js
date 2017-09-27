var fields = {};

function addfieldControll(inputID, value, isRequired) {
    var required = isRequired || false;
    $('#' + inputID).attr('isRequired', required);

    fields[inputID] = {
        inputID: inputID,
        value: value,
        isRequired: required
    }
}


// Returns True if there is an error in the code
function isItWrong() {
    var isError = false;

    var promise = new Promise(function(resolve, reject) {
        for (var item in fields) {
            var data = fields[item];
            if (data.isRequired && data.value.length == 0) {
                isError = true;
                reject(true);
            }
        };

        resolve(false);
    });

    return promise;
}

function convertToFormData(dataList) {
    var items = Object.assign({}, fields, dataList || null);
    var formData = new FormData();

    var promisse = new Promise(function(resolve, reject) {

        for (var item in fields) {
            var data = fields[item];
            formData.append(item, data.value);
        };
        resolve(formData);

    });

    return promisse;
}



//addfieldControll('languageSelect', $('#languageSelect').val(), true);
//addfieldControll('FUP_RESIM', $('#FUP_RESIM').val(), true);
//addfieldControll('CKEditorControl1', CKEDITOR.instances['CKEditorControl1'].getData(), true);

//
//isItWrong()
//    .then(function (isError) {
//        // if the value is empty
//        convertToFormData()
//            .then(function (formData) {
//                console.log('formData', formData.get('languageSelect'));
//            });
//    })
//.catch(function (isError) {
//    //alert('check all fields.');
//});