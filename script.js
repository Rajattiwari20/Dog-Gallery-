var breedImage = $("#breed-image");
var dropdown = $("#dog-breeds");

$.get("https://dog.ceo/api/breeds/list/all" , function(data){
    let dogBreed = data.message;
    for(let breed in dogBreed){
        dropdown.append($('<option></option>').val(breed).html(breed))
    }
});

dropdown.change(function(){
    let breed = dropdown.val();
    let url = "https://dog.ceo/api/breed/" + breed + "/list";
    $("#dog-sub-breeds").remove();
    $.get(url , function(data){
        if(data.message.length !== 0){
            let subBreeds = data.message;
            dropdown.after('<select id = "dog-sub-breeds"></select>');
            var subDropdown = $("#dog-sub-breeds");
            for (let subBreed of subBreeds){
                subDropdown.append('<option value="' + subBreed + '">' + subBreed + '</option>');
                console.log(subBreed);
            }
        }
    })
})


$("#get-img-btn").click(function (event) {
    event.preventDefault();

    let breed = dropdown.val();
    let subBreed = $("#dog-sub-breeds").val(); 

    let url = "https://dog.ceo/api/breed/" + breed;  

    if(subBreed !== undefined) {
        url += "/" + subBreed
    }    
    url += "/images";

    $("#breed-image img").remove();
    
    $.get(url, function (data) {
        let imagesUrl = data.message;

        for (let imageUrl of imagesUrl) {
            breedImage.append('<img src="' + imageUrl + '" alt="' + breed + '">');
        }
    });

});


