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
var __createBinding=this&&this.__createBinding||(Object.create?function(e,t,s,o){void 0===o&&(o=s);var r=Object.getOwnPropertyDescriptor(t,s);r&&!("get"in r?!t.__esModule:r.writable||r.configurable)||(r={enumerable:!0,get:function(){return t[s]}}),Object.defineProperty(e,o,r)}:function(e,t,s,o){void 0===o&&(o=s),e[o]=t[s]}),__setModuleDefault=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),__importStar=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var s in e)"default"!==s&&Object.prototype.hasOwnProperty.call(e,s)&&__createBinding(t,e,s);return __setModuleDefault(t,e),t};define(["require","exports","lit","TYPO3/CMS/Core/lit-helper","d3-drag","d3-selection"],(function(e,t,s,o,r,d){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.DragDrop=t.DraggablePositionEnum=void 0,r=__importStar(r),d=__importStar(d);var n;!function(e){e.INSIDE="inside",e.BEFORE="before",e.AFTER="after"}(n=t.DraggablePositionEnum||(t.DraggablePositionEnum={}));class i{static setDragStart(){document.querySelectorAll("iframe").forEach(e=>e.style.pointerEvents="none")}static setDragEnd(){document.querySelectorAll("iframe").forEach(e=>e.style.pointerEvents="")}constructor(e){this.timeout={},this.minimalDistance=10,this.tree=e}connectDragHandler(e){return r.drag().filter(e=>e instanceof MouseEvent).clickDistance(5).on("start",(function(t){e.dragStart(t)&&i.setDragStart()})).on("drag",(function(t){e.dragDragged(t)})).on("end",(function(t){i.setDragEnd(),e.dragEnd(t)}))}createDraggable(e,t){var r;let d=this.tree.svg.node();const n=(0,o.renderNodes)(class{static get(e,t){return s.html`<div class="node-dd node-dd--nodrop">
        <div class="node-dd__ctrl-icon"></div>
        <div class="node-dd__text">
            <span class="node-dd__icon">
                <svg aria-hidden="true" style="width: 16px; height: 16px">
                    <use xlink:ref="${e}"></use>
                </svg>
            </span>
            <span class="node-dd__name">${t}</span>
        </div>
    </div>`}}.get(e,t));d.after(...n),null===(r=this.tree.svg.node().querySelector(".nodes-wrapper"))||void 0===r||r.classList.add("nodes-wrapper--dragging")}updateDraggablePosition(e){let t=18,s=15;e.sourceEvent&&e.sourceEvent.pageX&&(t+=e.sourceEvent.pageX),e.sourceEvent&&e.sourceEvent.pageY&&(s+=e.sourceEvent.pageY),document.querySelectorAll(".node-dd").forEach(e=>{e.style.top=s+"px",e.style.left=t+"px",e.style.display="block"})}openNodeTimeout(){null!==this.tree.hoveredNode&&this.tree.hoveredNode.hasChildren&&!this.tree.hoveredNode.expanded?this.timeout.node!=this.tree.hoveredNode&&(this.timeout.node=this.tree.hoveredNode,clearTimeout(this.timeout.time),this.timeout.time=setTimeout(()=>{this.tree.hoveredNode&&(this.tree.showChildren(this.tree.hoveredNode),this.tree.prepareDataForVisibleNodes(),this.tree.updateVisibleNodes())},1e3)):clearTimeout(this.timeout.time)}changeNodeClasses(e){const t=this.tree.svg.select(".node-over"),s=this.tree.svg.node().parentNode.querySelector(".node-dd");let o=this.tree.nodesBgContainer.selectAll(".node-bg__border");if(t.size()&&this.tree.isOverSvg){o.empty()&&(o=this.tree.nodesBgContainer.append("rect").attr("class","node-bg__border").attr("height","1px").attr("width","100%"));let r=d.pointer(e,t.node())[1];if(r<3){o.attr("transform","translate(-8, "+(this.tree.hoveredNode.y-10)+")").style("display","block"),0===this.tree.hoveredNode.depth?this.addNodeDdClass(s,"nodrop"):this.tree.hoveredNode.firstChild?this.addNodeDdClass(s,"ok-above"):this.addNodeDdClass(s,"ok-between"),this.tree.settings.nodeDragPosition=n.BEFORE}else if(r>17)if(o.style("display","none"),this.tree.hoveredNode.expanded&&this.tree.hoveredNode.hasChildren)this.addNodeDdClass(s,"ok-append"),this.tree.settings.nodeDragPosition=n.INSIDE;else{o.attr("transform","translate(-8, "+(this.tree.hoveredNode.y+10)+")").style("display","block"),this.tree.hoveredNode.lastChild?this.addNodeDdClass(s,"ok-below"):this.addNodeDdClass(s,"ok-between"),this.tree.settings.nodeDragPosition=n.AFTER}else o.style("display","none"),this.addNodeDdClass(s,"ok-append"),this.tree.settings.nodeDragPosition=n.INSIDE}else this.tree.nodesBgContainer.selectAll(".node-bg__border").style("display","none"),this.addNodeDdClass(s,"nodrop")}addNodeDdClass(e,t){const s=this.tree.svg.node().querySelector(".nodes-wrapper");e&&this.applyNodeClassNames(e,"node-dd--",t),s&&this.applyNodeClassNames(s,"nodes-wrapper--",t),this.tree.settings.canNodeDrag="nodrop"!==t}removeNodeDdClass(){var e;this.tree.svg.node().querySelector(".nodes-wrapper").classList.remove("nodes-wrapper--nodrop","nodes-wrapper--ok-append","nodes-wrapper--ok-below","nodes-wrapper--ok-between","nodes-wrapper--ok-above","nodes-wrapper--dragging"),null===(e=this.tree.nodesBgContainer.node().querySelector(".node-bg.node-bg--dragging"))||void 0===e||e.classList.remove("node-bg--dragging"),this.tree.nodesBgContainer.selectAll(".node-bg__border").style("display","none"),this.tree.svg.node().parentNode.querySelector(".node-dd").remove()}isDragNodeDistanceMore(e,t){return t.startDrag||t.startPageX-this.minimalDistance>e.sourceEvent.pageX||t.startPageX+this.minimalDistance<e.sourceEvent.pageX||t.startPageY-this.minimalDistance>e.sourceEvent.pageY||t.startPageY+this.minimalDistance<e.sourceEvent.pageY}applyNodeClassNames(e,t,s){const o=["nodrop","ok-append","ok-below","ok-between","ok-above"].filter(e=>e!==s).map(e=>t+e);e.classList.remove(...o),e.classList.contains(t+s)||e.classList.add(t+s)}}t.DragDrop=i}));