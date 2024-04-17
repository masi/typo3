/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */
var __decorate=function(t,e,o,i){var r,a=arguments.length,s=a<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,o,i);else for(var n=t.length-1;n>=0;n--)(r=t[n])&&(s=(a<3?r(s):a>3?r(e,o,s):r(e,o))||s);return a>3&&s&&Object.defineProperty(e,o,s),s};import{html,LitElement,nothing}from"lit";import{customElement,property,state}from"lit/decorators.js";import{BroadcastMessage}from"@typo3/backend/broadcast-message.js";import BroadcastService from"@typo3/backend/broadcast-service.js";import{DataTransferTypes}from"@typo3/backend/enum/data-transfer-types.js";let DragToolTip=class extends LitElement{constructor(){super(),this.active=!1,this.statusIconIdentifier="apps-pagetree-drag-move-into",this.tooltipIconIdentifier=null,this.thumbnails=[],this.visible=!1,this.posX=0,this.posY=0,this.dragAllowed=!1,this.skipNextUpdateBroadcast=!1,this.eventAbortController=null,this.updatePositionFromDragEvent=t=>{this.visible=!(0===t.clientX&&0===t.clientY);const e=this.calculateIframeOffset(t.view,window);this.posX=t.clientX+e.x,this.posY=t.clientY+e.y,this.visible&&this.broadcast("visible")},this.trackDragOverAllowed=t=>{this.dragAllowed=t.defaultPrevented},this.trackDragEnd=()=>{this.active=!1},this.trackDragStart=t=>{if(!t.defaultPrevented&&t.dataTransfer.types.includes(DataTransferTypes.dragTooltip)){t.dataTransfer.setDragImage(this.ghostImage,0,0);const e=JSON.parse(t.dataTransfer.getData(DataTransferTypes.dragTooltip));this.reset(),Object.assign(this,e),this.broadcast("visible")}},this.onMetadataUpdate=t=>{const e=t.detail;Object.assign(this,e)},this.onBroadcastVisible=()=>{this.visible=!1},this.onBroadcastChangedProperties=t=>{const e=t.detail.payload;Object.keys(e).forEach((t=>{this[t]=e[t]})),this.skipNextUpdateBroadcast=!0},this.onIframeLoaded=t=>{let e;try{e=t.target.querySelector("iframe")?.contentWindow}catch{return}if(e){this.eventAbortController?.abort(),this.eventAbortController=new AbortController;const{signal:t}=this.eventAbortController,o=!0,i=!0;e.addEventListener("dragover",this.updatePositionFromDragEvent,{capture:o,passive:i,signal:t}),e.addEventListener("dragover",this.trackDragOverAllowed,{passive:i,signal:t}),e.addEventListener("dragend",this.trackDragEnd,{capture:o,passive:i,signal:t}),e.addEventListener("dragstart",this.trackDragStart,{passive:i,signal:t})}},this.ghostImage=new Image,this.ghostImage.src="data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs="}connectedCallback(){super.connectedCallback();const t=!0,e=!0;window.addEventListener("dragover",this.updatePositionFromDragEvent,{capture:t,passive:e}),window.addEventListener("dragover",this.trackDragOverAllowed,{passive:e}),window.addEventListener("dragend",this.trackDragEnd,{capture:t,passive:e}),window.addEventListener("dragstart",this.trackDragStart,{passive:e}),document.addEventListener("typo3:drag-tooltip:visible",this.onBroadcastVisible),document.addEventListener("typo3:drag-tooltip:changedProperties",this.onBroadcastChangedProperties),document.addEventListener("typo3:drag-tooltip:metadata-update",this.onMetadataUpdate),document.addEventListener("typo3-iframe-loaded",this.onIframeLoaded),this.eventAbortController?.abort(),this.eventAbortController=new AbortController}disconnectedCallback(){super.disconnectedCallback();const t=!0;window.removeEventListener("dragover",this.updatePositionFromDragEvent,{capture:t}),window.removeEventListener("dragover",this.trackDragOverAllowed),window.removeEventListener("dragend",this.trackDragEnd,{capture:t}),window.removeEventListener("dragstart",this.trackDragStart),document.removeEventListener("typo3:drag-tooltip:visible",this.onBroadcastVisible),document.removeEventListener("typo3:drag-tooltip:changedProperties",this.onBroadcastChangedProperties),document.removeEventListener("typo3:drag-tooltip:metadata-update",this.onMetadataUpdate),document.removeEventListener("typo3-iframe-loaded",this.onIframeLoaded),this.eventAbortController?.abort(),this.eventAbortController=null}reset(){this.active=!0,this.visible=!0,this.statusIconIdentifier="apps-pagetree-drag-move-into",this.tooltipIconIdentifier="",this.tooltipLabel="",this.tooltipDescription="",this.thumbnails=[],this.posX=0,this.posY=0,this.dragAllowed=!1}updated(t){if(this.skipNextUpdateBroadcast)return void(this.skipNextUpdateBroadcast=!1);const e=[...t.keys()].filter((t=>!1!==this.constructor.elementProperties.get(t).attribute));if(0===e.length)return;const o=e.map((t=>[t,this[t]]));this.broadcast("changedProperties",Object.fromEntries(o))}broadcast(t,e){BroadcastService.post(new BroadcastMessage("drag-tooltip",t,e||{}))}calculateIframeOffset(t,e){let o=0,i=0;if(t===e)return{x:o,y:i};const r=this.calculateIframeOffset(t.parent,e);o+=r.x,i+=r.y;const a=t.frameElement;if(a){const t=a.getBoundingClientRect();o+=t.x,i+=t.y}return{x:o,y:i}}createRenderRoot(){return this}render(){return this.active&&this.visible?0===this.posX&&0===this.posY?nothing:html`
      <div class="dragging-tooltip" style="top: ${this.posY+18}px; left: ${this.posX+18}px;">
        <div class="dragging-tooltip-control">
          <typo3-backend-icon identifier="${this.dragAllowed?this.statusIconIdentifier??"actions-question":"actions-ban"}" size="small">
          </typo3-backend-icon>
        </div>
        <div class="dragging-tooltip-content">
          <div class="dragging-tooltip-content-icon">
            <typo3-backend-icon identifier="${this.tooltipIconIdentifier}" size="small"></typo3-backend-icon>
          </div>
          <div class="dragging-tooltip-content-label">
            ${""!==this.tooltipLabel?html`<div class="dragging-tooltip-content-name">${this.tooltipLabel}</div>`:nothing}
            ${""!==this.tooltipDescription?html`<div class="dragging-tooltip-content-description">${this.tooltipDescription}</div>`:nothing}
          </div>
          ${0===this.thumbnails.length?nothing:html`
            <div class="dragging-tooltip-thumbnails">
              ${this.thumbnails.slice(0,3).map((t=>html`
                <img src="${t.src}" width="${t.width}" height="${t.height}">
              `))}
            </div>
          `}
        </div>
      </div>
    `:nothing}};__decorate([property({type:Boolean,reflect:!0})],DragToolTip.prototype,"active",void 0),__decorate([property({type:String,reflect:!0})],DragToolTip.prototype,"statusIconIdentifier",void 0),__decorate([property({type:String})],DragToolTip.prototype,"tooltipIconIdentifier",void 0),__decorate([property({type:String})],DragToolTip.prototype,"tooltipLabel",void 0),__decorate([property({type:String})],DragToolTip.prototype,"tooltipDescription",void 0),__decorate([property({type:Array})],DragToolTip.prototype,"thumbnails",void 0),__decorate([state()],DragToolTip.prototype,"visible",void 0),__decorate([state()],DragToolTip.prototype,"posX",void 0),__decorate([state()],DragToolTip.prototype,"posY",void 0),__decorate([state()],DragToolTip.prototype,"dragAllowed",void 0),DragToolTip=__decorate([customElement("typo3-backend-drag-tooltip")],DragToolTip);export{DragToolTip};