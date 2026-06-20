export const agenticNodes = [
  { id: '1', type: 'model', position: { x: 40,  y: 160 }, data: { label: 'save_draft' } },
  { id: '2', type: 'agent', position: { x: 240, y: 160 }, data: { label: 'score_cv', tag: 'ai' } },
  { id: '3', type: 'func',  position: { x: 470, y: 80  }, data: { label: 'fast_track' } },
  { id: '4', type: 'end',   position: { x: 470, y: 240 }, data: { label: 'reject' } },
];

export const agenticEdges = [
  { id: 'a-12', source: '1', target: '2', type: 'custom', data: { label: 'default' } },
  { id: 'a-23', source: '2', target: '3', type: 'custom', data: { label: 'strong', sigClass: 'wf-sig-pos' } },
  { id: 'a-24', source: '2', target: '4', type: 'custom', data: { label: 'weak',   sigClass: 'wf-sig-neg' } },
];

export const functionalNodes = [
  { id: '1', type: 'func',  position: { x: 40,  y: 160 }, data: { label: 'validate' } },
  { id: '2', type: 'model', position: { x: 240, y: 80  }, data: { label: 'save' } },
  { id: '3', type: 'func',  position: { x: 460, y: 80  }, data: { label: 'notify' } },
  { id: '4', type: 'end',   position: { x: 240, y: 240 }, data: { label: 'END' } },
];

export const functionalEdges = [
  { id: 'f-12', source: '1', target: '2', type: 'custom', data: { label: 'valid',   sigClass: 'wf-sig-pos' } },
  { id: 'f-14', source: '1', target: '4', type: 'custom', data: { label: 'invalid', sigClass: 'wf-sig-neg' } },
  { id: 'f-23', source: '2', target: '3', type: 'custom', data: { label: 'default' } },
];
