let btnscrap = document.getElementById('scrap-profile')

btnscrap.addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (tab !== null) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: scrapingProfile,
    });
  }
})

const scrapingProfile = () => {
  const wait = function (milliseconds) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        resolve();
      }, milliseconds);
    });
  };

   
  const elementNameProfile = document.querySelector("div.ph5.pb5 > div.display-flex.mt2 ul li")
  const elementNameTitle = document.querySelector("div.ph5.pb5 > div.display-flex.mt2 h2")  
  const name = elementNameProfile ? elementNameProfile.innerText : '';
  const title = elementNameTitle ? elementNameTitle.innerText : '';
  wait(2000)
  const elementMoreResume = document.getElementById('line-clamp-show-more-button')

  if (elementMoreResume) elementMoreResume.click();
  const elementResume = document.querySelector('section.pv-about-section > p')
  const resume = elementResume ? elementNameTitle.innerText : '';
  
  const buttonInfo = document.querySelector("div.flex-1.mr5 a[data-control-name='contact_see_more']");
  

  if (buttonInfo) buttonInfo.click();    
  
  const sectionPhone = document.querySelector('section.pv-contact-info__contact-type.ci-phone ul li');
  const sectionEmail = document.querySelector('section.pv-contact-info__contact-type.ci-email div a');
  const sectionBirthday = document.querySelector('section.pv-contact-info__contact-type.ci-birthday div span');

  const phone = sectionPhone ? sectionPhone.innerText : '';
  const email = sectionEmail ? sectionEmail.innerText : '';
  const birthday = sectionBirthday ? sectionBirthday.innerText : '';

  const buttonCerraModal = document.querySelector('button.artdeco-modal__dismiss.artdeco-button.artdeco-button--circle.artdeco-button--muted.artdeco-button--2.artdeco-button--tertiary.ember-view');
  if (buttonCerraModal) buttonCerraModal.click();    

  wait(5000);  

  document.querySelector(".global-footer.global-footer--static.ember-view").scrollIntoView();

  const sectionExperiencia = document.querySelector('section.pv-profile-section.experience-section.ember-view ul');
  let NumberChildren = 0;
  let experience = [];
  if(sectionExperiencia)
  { 
    NumberChildren = sectionExperiencia.childElementCount;
    for (let i = 0; i < NumberChildren; i++) {
      
      const NameEmpresa =  sectionExperiencia.children[i].querySelector('p.pv-entity__secondary-title.t-14.t-black.t-normal');
      const empresa = NameEmpresa ? NameEmpresa.innerText : '';      
      
      const NameCargo =  sectionExperiencia.children[i].querySelector('h3.t-16.t-black.t-bold');
      const cargo = NameCargo ? NameCargo.innerText : '';     

      const SectionPeriodo =  sectionExperiencia.children[i].querySelector('h4.pv-entity__date-range.t-14.t-black--light.t-normal');
      const periodo = SectionPeriodo ? SectionPeriodo.innerText : '';     

      const Sectionfunciones  = sectionExperiencia.children[i].querySelector('p.pv-entity__description');
      const funciones  = Sectionfunciones ? Sectionfunciones.innerText : ''; 
       
      experience.push({empresa,cargo,periodo,funciones});
    }     
  }


  const sectionEducacion = document.querySelector('section.pv-profile-section.education-section.ember-view ul');
  //document.querySelector('section.pv-profile-section.education-section.ember-view ul').children[0].querySelector('p.pv-entity__dates').children[1].innerText;
  let academicos = [];
  if(sectionEducacion)
  { 
    NumberChildren = sectionEducacion.childElementCount;
    for (let i = 0; i < NumberChildren; i++) {
      
      const NameCollege =  sectionEducacion.children[i].querySelector('h3.pv-entity__school-name');
      const College = NameCollege ? NameCollege.innerText : '';      

      const GradeCollege =  sectionEducacion.children[i].getElementsByClassName('pv-entity__comma-item')[0];
      const Grade = GradeCollege ? GradeCollege.innerText : ''; 

      const PeriodoCollege =  sectionEducacion.children[i].querySelector('p.pv-entity__dates');
      const Periodo = PeriodoCollege ? PeriodoCollege.children[1].innerText : ''; 
      
      academicos.push({College,Grade,Periodo});
    }     
  }
  
  console.log({ name, title, resume, phone,email,birthday,experience,academicos})
}