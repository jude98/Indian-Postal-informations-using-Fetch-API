window.location.href = "#home";
document.querySelector('#form-zip').addEventListener('submit', fetchZipDetails);
document.querySelector('#form-branch').addEventListener('submit', fetchBranchDetails);

//              section zipcode

//     Fetch Zip code details

function fetchZipDetails(e){
    e.preventDefault();
    document.querySelector('#heading-zip').innerHTML = '';
    document.querySelector('#output-zip').innerHTML = '';
    document.getElementById('zip').classList.remove("is-invalid");
    var zip = document.getElementById('zip').value;
    if(zip != ''){
        fetch(`https://api.postalpincode.in/pincode/${zip}`)
        .then(response => response.json())
        .then(data => {
            if(data[0].Status === 'Success'){
                
                printZipDetails(data,zip);
            }
            else{
                document.querySelector('#zip').classList.add("is-invalid");
                ele = document.querySelector("#validation-zip");
                ele.classList.add("invalid-feedback");
                ele.innerHTML = "Enter valid pincode!";

            }
        });
    }
}

//     Display Zip code details

function printZipDetails(data,zip){
    document.querySelector('#heading-zip').innerHTML = data[0].Message;
    
    output = '';    
    data[0].PostOffice.forEach(office => {
        output += `<div class="col mb-4">
                        <div class="card bg-dark text-white h-100 w-70">
                            <div class="card-body">
                                <h5 lass="card-title">Post office : ${office.Name}</h5>
                                <dl class="row">
                                    <dt class="col-sm-3">Branch Type : </dt>
                                    <dd class="col-sm-9">${office.BranchType}</dd>
                                    <dt class="col-sm-3">Delivery Status : </dt>
                                    <dd class="col-sm-9">${office.DeliveryStatus}</dd>
                                    <dt class="col-sm-3">State : </dt>
                                    <dd class="col-sm-9">${office.State}</dd>
                                    <dt class="col-sm-3">District : </dt>
                                    <dd class="col-sm-9">${office.District}</dd>
                                </dl>
                            </div>
                        </div>
                    </div>`
    });

    document.querySelector('#output-zip').innerHTML = output;
    
}


//           Section Branch 

//   Fetch Branch Details

function fetchBranchDetails(e){
    e.preventDefault();
    var branch = document.querySelector('#zbranch').value;
    document.querySelector('#heading-branch').innerHTML = '';
    document.querySelector('#output-branch').innerHTML = '';
    document.getElementById('zbranch').classList.remove("is-invalid");
    if(branch != ''){
        fetch(`https://api.postalpincode.in/postoffice/${branch}`)
        .then(response => response.json())
        .then(data => {
            if(data[0].Status === 'Success'){
                printBranchDetails(data,branch);
            }else{
                document.querySelector('#zbranch').classList.add("is-invalid");
                ele = document.querySelector("#validation-branch");
                ele.classList.add("invalid-feedback");
                ele.innerHTML = "Enter valid branch name!";
            }
        });
    }
}


//     Display Branch Details
function printBranchDetails(data,branch){
    document.querySelector('#heading-branch').innerHTML = data[0].Message;
    output = '';    
    data[0].PostOffice.forEach(office => {
        output += `<div class="col mb-4">
                        <div class="card bg-info text-white h-100 w-70">
                            <div class="card-body">
                                <h5 lass="card-title">Post office : ${office.Name}</h5>
                                <dl class="row">
                                    <dt class="col-sm-3">Pincode : </dt>
                                    <dd class="col-sm-9">${office.Pincode}</dd>
                                    <dt class="col-sm-3">BranchType : </dt>
                                    <dd class="col-sm-9">${office.BranchType}</dd>
                                    <dt class="col-sm-3">State : </dt>
                                    <dd class="col-sm-9">${office.State}</dd>
                                    <dt class="col-sm-3">District : </dt>
                                    <dd class="col-sm-9">${office.District}</dd>
                                </dl>
                            </div>
                        </div>
                    </div>`
    });

    document.querySelector('#output-branch').innerHTML = output;
    
}