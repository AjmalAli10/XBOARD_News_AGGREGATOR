
magazines.forEach(async (data, indx) => {
    // console.log("https://api.rss2json.com/v1/api.json?rss_url=" + data)
    let rssFeed = await fetch(encodeURI("https://api.rss2json.com/v1/api.json?rss_url=") + data)
    let dataFeed  = await rssFeed.json()
    // console.log(dataFeed.feed.title)
    // console.log(dataFeed.items)

    const ID = ()=>Math.random().toString(36).substr(2,7);
    // console.log(ID())

    const accordionId = ID()
    let accordItem = accordionItems(dataFeed, indx, accordionId)
    document.getElementById("accordionId").innerHTML += accordItem;

    let carouselInnerId = ID();
    let carouselId = ID();
    let carouselOuter = mainCarouselParent(carouselId, carouselInnerId);
    document.getElementById(`accordBody${accordionId}`).innerHTML = carouselOuter;

    let items = dataFeed.items
    items.forEach((item, indx)=>{
      let carouselItemId = ID()
      let carouselItems = carouselItem(carouselItemId, indx)
      document.getElementById(`carousel-inner${carouselInnerId}`).innerHTML += carouselItems


      const card = createCard(item)
      document.getElementById(`${carouselItemId}`).innerHTML += card
    })

});

function accordionItems(data, indx, id){
  const accordItems = `
  <div class="accordion-item">
  <h2 class="accordion-header" d="heading${id}">
    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${id}" aria-expanded="${indx === 0 ? "true" : "false"}" aria-controls="collapse${id}">
      ${data.feed.title}
    </button>
  </h2>
  <div id="collapse${id}" style="display:block" class="accordion-collapse collapse ${indx === 0 ? "show" : ""}" aria-labelledby="heading${id}" data-bs-parent="#accordionId">
    <div class="accordion-body" id="accordBody${id}">
      
    </div>
  </div>
  </div>`
  return accordItems;
    
}

function mainCarouselParent(carouselId, carouselInnerId){
  const carouselParent =`
  <div class="carousel slide" data-bs-ride="carousel" id="carouselExampleControls${carouselId}">
    <div class="carousel-inner" id="carousel-inner${carouselInnerId}">
    
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls${carouselId}" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls${carouselId}" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>`
  return carouselParent;
}

function carouselItem(id, indx){
  return `
    <div class="carousel-item ${indx === 0 ? "active" : ""}" id="${id}">
    </div>`
}

function createCard(item){
  return `
  <a href="${item.link}" target="_blank">
    <div class="card">
        <div class="card-body">
            <img src="${item.enclosure.link}" alt="Los Angeles" class ="carousel-img">
            <div class="item-heading">
              <h3>${item.title}</h3>
              <div style= "display:flex; align-items:center;">
              <h4 style="display:inline-block; margin-right: 10px;">${item.author}</h4>
              <div class="dot"></div>
              <div class="date" style="margin-left:10px">${new Date(item.pubDate).toLocaleDateString("en-IN")}</div>
            </div>
              <p>${item.description}</p>
            </div>
        </div>
    </div>
  </a>`
}