(() => {

    fetch('https://api.artic.edu/api/v1/artworks?fields=id,title,artist_display,date_display,artist_titles,category_titles,term_titles,image_id&limit=100')
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        var myHTMLOutput = ""; // ST

        myHTMLOutput += "<table> <tr> <th>ID</th> <th>Title</th> <th>Artist</th> <th>Date</th> <th>Artist Titles</th> <th>Category Titles</th> <th>Term Titles</th> <th>Thumbnail</th>"; // ST

        data['data'].forEach(function(element){
            myHTMLOutput += "<tr>";
            myHTMLOutput += "<td>" + element.id + "</td>"; // ST
            myHTMLOutput += "<td>" + element.title + "</td>"; // ST
            myHTMLOutput += "<td>" + element.artist_display + "</td>"; // ST
            myHTMLOutput += "<td>" + element.date_display + "</td>"; // ST
            myHTMLOutput += "<td> <table class='innerTable'>"
            element.artist_titles.forEach(function(title){
                myHTMLOutput += "<tr>";
                myHTMLOutput += "<td class='innerTable'>" + title + "</td>"; // ST
                myHTMLOutput += "</tr>";

            })
            myHTMLOutput += "</table> </td>"
            myHTMLOutput += "<td> <table class='innerTable'>"
            element.category_titles.forEach(function(title){
                myHTMLOutput += "<tr>";
                myHTMLOutput += "<td class='innerTable'>" + title + "</td>"; // ST
                myHTMLOutput += "</tr>";

            })
            myHTMLOutput += "</table> </td>"
            myHTMLOutput += "<td> <table class='innerTable'>"
            element.term_titles.forEach(function(title){
                myHTMLOutput += "<tr>";
                myHTMLOutput += "<td class='innerTable'>" + title + "</td>"; // ST
                myHTMLOutput += "</tr>";
            })
            myHTMLOutput += "</table> </td>"
            myHTMLOutput += "<td><img src=\"" + data['config'].iiif_url + "/" + element.image_id + "/full/843,/0/default.jpg\"> </td>"
            myHTMLOutput += "</tr>";
        });

        myHTMLOutput += "</table>"; // ST

        document.querySelector("#myData").innerHTML = myHTMLOutput; // ST
    })
})();

//API Source:
//https://api.artic.edu/docs/#conventions