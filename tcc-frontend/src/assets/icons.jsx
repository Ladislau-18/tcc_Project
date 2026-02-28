
import './icons.css';


/* Icone de ficheiro TCC*/
export const FileIcon = () => (
  <svg className='imgFile' viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

/*######## icones dos cards do Dashboard ############*/

export const BookIcon = () =>( 
  <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24" fill="none" stroke="var(--fundo-escuro)">

<g id="SVGRepo_bgCarrier" stroke-width="0"/>

<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>

<g id="SVGRepo_iconCarrier"> <path d="M4 19V6.2C4 5.0799 4 4.51984 4.21799 4.09202C4.40973 3.71569 4.71569 3.40973 5.09202 3.21799C5.51984 3 6.0799 3 7.2 3H16.8C17.9201 3 18.4802 3 18.908 3.21799C19.2843 3.40973 19.5903 3.71569 19.782 4.09202C20 4.51984 20 5.0799 20 6.2V17H6C4.89543 17 4 17.8954 4 19ZM4 19C4 20.1046 4.89543 21 6 21H20M9 7H15M9 11H15M19 17V21" stroke="#000000" stroke-width="1.512" stroke-linecap="round" stroke-linejoin="round"/> </g>

</svg>

)

export const InsertIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="iconCard" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
    <line x1="12" x2="12" y1="19" y2="5" />
    <polyline points="5 12 12 5 19 12" />
  </svg>
)

export const GraficIcon = () =>(
  <svg xmlns="http://www.w3.org/2000/svg"  width="30px" height="30px" viewBox="0 0 24 24" id="Layer_1" data-name="Layer 2">
<defs><clipPath id="clip-path">
    <rect class="cls-1" width="24" height="24"/>
  </clipPath>
</defs>
<title>shelf</title>

<g class="cls-2">
<path d="M20.15,20.24H3.85a1,1,0,0,1-1-1V3a1,1,0,0,1,1-1h16.3a1,1,0,0,1,1,1V19.24A1,1,0,0,1,20.15,20.24Zm-15.3-2h14.3V4H4.85Z"/>
<path d="M12,20.24a1,1,0,0,1-1-1V3a1,1,0,1,1,2,0V19.24A1,1,0,0,1,12,20.24Z"/>
<path d="M20.15,12.09H3.85a1,1,0,1,1,0-2h16.3a1,1,0,0,1,0,2Z"/>
<path d="M6.51,22.05a1,1,0,0,1-1-1V19.24a1,1,0,0,1,2,0v1.81A1,1,0,0,1,6.51,22.05Z"/>
<path d="M17.49,22.05a1,1,0,0,1-1-1V19.24a1,1,0,0,1,2,0v1.81A1,1,0,0,1,17.49,22.05Z"/>
<path d="M14.23,12.09a1,1,0,0,1-1-1V5.66a1,1,0,0,1,2,0v5.43A1,1,0,0,1,14.23,12.09Z"/>
<path d="M17.92,12.1a1,1,0,0,1-1-.71l-1.4-4.53a1,1,0,1,1,1.91-.59l1.4,4.53a1,1,0,0,1-.66,1.25A1,1,0,0,1,17.92,12.1Z"/>
<path d="M9.28,20.24a1,1,0,0,1-1-1V13.81a1,1,0,0,1,2,0v5.43A1,1,0,0,1,9.28,20.24Z"/>
</g>

</svg>

)


/*###### icones do Sidebar*/
// https://feathericons.dev/

export const HomeIcon = () =>(
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="main-grid-item-icon" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
  <polyline points="9 22 9 12 15 12 15 22" />
</svg>

)

export const UserIcon = () =>(
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="main-grid-item-icon" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
  <circle cx="12" cy="7" r="4" />
</svg>
)


export const SearchIcon = () =>(
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="main-grid-item-icon" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
  <circle cx="11" cy="11" r="8" />
  <line x1="21" x2="16.65" y1="21" y2="16.65" />
</svg>
)


export const RegistIcon = () =>(
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="main-grid-item-icon" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
  <polyline points="14 2 14 8 20 8" />
  <line x1="12" x2="12" y1="18" y2="12" />
  <line x1="9" x2="15" y1="15" y2="15" />
</svg>
)


export const CatalogIcon = () =>(
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="main-grid-item-icon" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
  <polyline points="14 2 14 8 20 8" />
  <line x1="16" x2="8" y1="13" y2="13" />
  <line x1="16" x2="8" y1="17" y2="17" />
  <polyline points="10 9 9 9 8 9" />
</svg>

)


/* ########### Icone de 'Pesquisa não encontrada' #########*/

export const SearchNotFoundIcon = () =>(
  <svg xmlns="http://www.w3.org/2000/svg" width="80%" height="80%" viewBox="0 -0.5 25 25" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.5 11.493C5.50364 8.39226 7.69698 5.72579 10.7388 5.12416C13.7807 4.52253 16.8239 6.15327 18.0077 9.0192C19.1915 11.8851 18.186 15.1881 15.6063 16.9085C13.0265 18.6288 9.59077 18.2874 7.4 16.093C6.18148 14.8725 5.49799 13.2177 5.5 11.493Z" stroke="var(--fundo-escuro)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16.062 16.568L19.5 19.993" stroke="var(--fundo-escuro)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.5303 8.96271C10.2374 8.66982 9.76256 8.66982 9.46967 8.96271C9.17678 9.25561 9.17678 9.73048 9.46967 10.0234L10.5303 8.96271ZM11.4697 12.0234C11.7626 12.3163 12.2374 12.3163 12.5303 12.0234C12.8232 11.7305 12.8232 11.2556 12.5303 10.9627L11.4697 12.0234ZM12.5303 10.9627C12.2374 10.6698 11.7626 10.6698 11.4697 10.9627C11.1768 11.2556 11.1768 11.7305 11.4697 12.0234L12.5303 10.9627ZM13.4697 14.0234C13.7626 14.3163 14.2374 14.3163 14.5303 14.0234C14.8232 13.7305 14.8232 13.2556 14.5303 12.9627L13.4697 14.0234ZM12.5303 12.0234C12.8232 11.7305 12.8232 11.2556 12.5303 10.9627C12.2374 10.6698 11.7626 10.6698 11.4697 10.9627L12.5303 12.0234ZM9.46967 12.9627C9.17678 13.2556 9.17678 13.7305 9.46967 14.0234C9.76256 14.3163 10.2374 14.3163 10.5303 14.0234L9.46967 12.9627ZM11.4697 10.9627C11.1768 11.2556 11.1768 11.7305 11.4697 12.0234C11.7626 12.3163 12.2374 12.3163 12.5303 12.0234L11.4697 10.9627ZM14.5303 10.0234C14.8232 9.73048 14.8232 9.25561 14.5303 8.96271C14.2374 8.66982 13.7626 8.66982 13.4697 8.96271L14.5303 10.0234ZM9.46967 10.0234L11.4697 12.0234L12.5303 10.9627L10.5303 8.96271L9.46967 10.0234ZM11.4697 12.0234L13.4697 14.0234L14.5303 12.9627L12.5303 10.9627L11.4697 12.0234ZM11.4697 10.9627L9.46967 12.9627L10.5303 14.0234L12.5303 12.0234L11.4697 10.9627ZM12.5303 12.0234L14.5303 10.0234L13.4697 8.96271L11.4697 10.9627L12.5303 12.0234Z" fill="var(--fundo-escuro)"/>
</svg>
)
