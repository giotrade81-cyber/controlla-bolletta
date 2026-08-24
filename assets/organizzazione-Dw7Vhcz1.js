import{V as p}from"./VoiceAssistant-Bq0nJYdp.js";new p("http://localhost:3000/api");document.addEventListener("DOMContentLoaded",()=>{g()});function g(){const o=document.getElementById("lista-oggi"),a=document.getElementById("lista-prossimamente");if(!o||!a)return;const i=localStorage.getItem("APPUNIC_TASKS")||"[]",e=JSON.parse(i),l=new Date().toISOString().split("T")[0],n=[],s=[];e.forEach(t=>{let r=!0,c="Nessuna scadenza";t.scadenza&&(c=new Date(t.scadenza).toLocaleDateString("it-IT",{weekday:"long",day:"numeric",month:"long",hour:"2-digit",minute:"2-digit"}),t.scadenza.split("T")[0]>l&&(r=!1));const d=`
      <div style="background: ${r?"rgba(255,106,43,0.1)":"rgba(31,122,77,0.1)"}; 
                  border-left: 4px solid ${r?"var(--mandarino)":"var(--basilico)"}; 
                  padding: 10px 15px; margin-bottom: 10px; border-radius: 0 8px 8px 0;
                  display: flex; justify-content: space-between; align-items: center;">
        <div>
          <strong style="display: block; margin-bottom: 5px; ${t.completata?"text-decoration: line-through; color: #888;":""}">${t.titolo}</strong>
          <span style="font-size: 0.85em; color: var(--inchiostro-tenue);">Scadenza: ${c}</span>
        </div>
        <button onclick="toggleTask('${t.id}')" style="background: none; border: 1px solid #ccc; border-radius: 4px; padding: 5px 10px; cursor: pointer;">
          ${t.completata?"Ripristina":"Fatto ✅"}
        </button>
      </div>
    `;r?n.push(d):s.push(d)}),n.length===0&&n.push('<p style="color: #888; font-style: italic;">Nessuna priorità per oggi. Prova a dire "Ricordami di..."</p>'),s.length===0&&s.push('<p style="color: #888; font-style: italic;">Niente in programma prossimamente.</p>'),o.innerHTML=n.join(""),a.innerHTML=s.join("")}window.toggleTask=o=>{const a=localStorage.getItem("APPUNIC_TASKS")||"[]",i=JSON.parse(a),e=i.find(l=>l.id===o);e&&(e.completata=!e.completata,localStorage.setItem("APPUNIC_TASKS",JSON.stringify(i)),g())};
