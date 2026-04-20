// ==UserScript==
// @name         extrasearch
// @namespace    https://danbooru.donmai.us/forum_topics/8502
// @version      0.0.0
// @author       shemingwan_wen
// @description  18/04/2026, 21.17.26
// @license      MIT
// @match        *://*.danbooru.donmai.us/tags*
// @match        *://*.danbooru.donmai.us/artists*
// ==/UserScript==

(function () {
	'use strict';

	function p(e){const t=document.createElement("div");return t.classList.add("input","stacked-input","select","optional",e),t}function h(e,t){const n=document.createElement("label");return n.classList.add("select","optional"),n.setAttribute("for",e),n.innerText=t,n}function d(e,t,n,s){const c=p(e),r=h(e,n),a=document.createElement("input");return a.classList.add("w-full","max-w-360px","string","optional","input"),a.type=s,a.name=t,a.id=e,c.append(r),c.append(a),c}function u(e,t,n,s=[{label:" ",value:""},{label:"yes",value:"yes"},{label:"no",value:"no"}]){const c=new URLSearchParams(window.location.search),r=p(e),a=h(e,n),o=document.createElement("select");o.classList.add("select","optional"),o.name=t,o.id=e;for(let i of s){let l=document.createElement("option");l.label=i.label,l.innerText=i.label,l.value=i.value,l.selected=c.get(t)===i.value,o.append(l);}return r.append(a),r.append(o),r}function f(e,t,n,s){const c=p(e),r=h(e,t),a=document.createElement("input");return a.classList.add("boolean","optional"),a.type="checkbox",a.id=e,a.onclick=n,s!==void 0&&(a.checked=s()),c.append(r),c.append(a),c}(function(){const e=window.location.pathname;e.match(/tags/)?g():e.match(/artists/)&&x();})();function g(){const e=new URLSearchParams(window.location.search),t=document.querySelector("#page .search-form"),n=document.querySelector("#search_name_or_alias_matches"),s=document.querySelector(".search_category"),c=document.querySelector("input[type=submit]");e.get("search[name_regex]")!==null&&(n.name="search[name_regex]",n.value=e.get("search[name_regex]"));const r=f("search_enable_regex","Enable regex?",_=>{const b=_.target;n.name=b.checked?"search[name_regex]":"search[name_or_alias_matches]";},()=>e.get("search[name_regex]")!==null),a=d("search_post_count","search[post_count]","Post count","text"),o=d("search_created_at","search[created_at]","Created at","text"),i=d("search_updated_at","search[updated_at]","Updated at","text"),l=u("search_implies_another","search[has_antecedent_implications]","Implies another tag?"),m=u("search_implied_by_another","search[has_consequent_implications]","Implied by another tag?");t.insertBefore(r,s),t.insertBefore(a,s.nextSibling),t.insertBefore(o,a.nextSibling),t.insertBefore(i,o.nextSibling),t.insertBefore(l,c),t.insertBefore(m,c);}function x(){const e=document.querySelector("input[type=submit]"),t=document.querySelector("#page .search-form"),n=document.querySelector(".search_is_deleted"),s=d("search_created_at","search[created_at]","Created at","text"),c=d("search_updated_at","search[updated_at]","Updated at","text"),r=u("search_is_banned","search[is_banned]","Is banned?");t.insertBefore(s,n),t.insertBefore(c,n),t.insertBefore(r,e);}

})();