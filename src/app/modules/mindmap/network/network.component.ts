import {
  Component,
  ElementRef,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import cytoscape, { EdgeDataDefinition, NodeDataDefinition } from 'cytoscape';

@Component({
  selector: 'app-network',
  imports: [],
  templateUrl: './network.component.html',
  styleUrl: './network.component.css',
})
export class NetworkComponent implements OnInit {
  readonly container = viewChild.required<ElementRef>('cyContainer');
  readonly modal = viewChild.required<ElementRef<HTMLDialogElement>>('modal');

  ngOnInit(): void {
    const testNodes: NodeDataDefinition[] = [
      { id: 'a', label: 'Node A', detail: 'Details about A' },
      { id: 'b', label: 'Node B', detail: 'B details' },
      { id: 'c', label: 'Node C', detail: 'Some info' },
      { id: 'd', label: 'Node D', detail: 'D details' },
      { id: 'e', label: 'Node E', detail: 'E details' },
      { id: 'f', label: 'Node F', detail: 'F details' },
      { id: 'g', label: 'Node G', detail: 'G details' },
      { id: 'h', label: 'Node H', detail: 'H details' },
      { id: 'i', label: 'Node I', detail: 'I details' },
      { id: 'j', label: 'Node J', detail: 'J details' },
    ];

    const testEdges: EdgeDataDefinition[] = [
      { id: 'ab', source: 'a', target: 'b' },
      { id: 'ac', source: 'a', target: 'c' },
      { id: 'ad', source: 'a', target: 'd' },
      { id: 'bc', source: 'b', target: 'c' },
      { id: 'cf', source: 'c', target: 'f' },
      { id: 'cg', source: 'c', target: 'g' },
      { id: 'gh', source: 'g', target: 'h' },
      { id: 'gi', source: 'g', target: 'i' },
      { id: 'cj', source: 'c', target: 'j' },
      { id: 'ae', source: 'a', target: 'e' },
      { id: 'eg', source: 'e', target: 'g' },
    ];

    const data = [];

    for (const node of testNodes) {
      data.push({ data: node });
    }

    for (const edge of testEdges) {
      data.push({ data: edge });
    }

    const cy = cytoscape({
      container: this.container().nativeElement,
      elements: data,
      layout: { name: 'cose' },
      style: [
        {
          selector: 'node',
          style: {
            label: 'data(label)',
            'background-color': '#007bff',
            color: '#fff',
          },
        },
        {
          selector: 'edge',
          style: {
            width: 2,
            'line-color': '#ccc',
          },
        },
      ],
    });

    cy.on('layoutstop', () => {
      cy.zoom(4);
      cy.center();
    });

    cy.on('tap', 'node', (evt) => {
      // const data = evt.target.data();
      // alert(`Clicked: ${data.label}\n${data.detail}`);
      this.modal().nativeElement.showModal();
    });
  }
}
