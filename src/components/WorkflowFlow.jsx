import {
  ReactFlow,
  Handle,
  Position,
  BaseEdge,
  EdgeLabelRenderer,
  getSmoothStepPath,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const handleStyle = { opacity: 0, width: 1, height: 1, border: 0 };

const ModelNode = ({ data }) => (
  <>
    <Handle type="target" position={Position.Left} style={handleStyle} />
    <div className="wf-node n-model">{data.label}</div>
    <Handle type="source" position={Position.Right} style={handleStyle} />
  </>
);

const AgentNode = ({ data }) => (
  <>
    <Handle type="target" position={Position.Left} style={handleStyle} />
    <div className="wf-node n-agent">
      {data.label}
      {data.tag && <span className="n-tag">{data.tag}</span>}
    </div>
    <Handle type="source" position={Position.Right} style={handleStyle} />
  </>
);

const FuncNode = ({ data }) => (
  <>
    <Handle type="target" position={Position.Left} style={handleStyle} />
    <div className="wf-node n-func">{data.label}</div>
    <Handle type="source" position={Position.Right} style={handleStyle} />
  </>
);

const EndNode = ({ data }) => (
  <>
    <Handle type="target" position={Position.Left} style={handleStyle} />
    <div className="wf-node n-end wf-node-sm">{data.label}</div>
  </>
);

const nodeTypes = { model: ModelNode, agent: AgentNode, func: FuncNode, end: EndNode };

const CustomEdge = ({
  id, sourceX, sourceY, targetX, targetY,
  sourcePosition, targetPosition, markerEnd, data,
}) => {
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition,
  });
  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          strokeWidth: 1.5,
          stroke: 'rgba(34, 211, 238, 0.4)',
          strokeDasharray: '6 4',
          animation: 'flow-dash 1s linear infinite',
        }}
      />
      <EdgeLabelRenderer>
        <div
          className="nodrag nopan"
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: 'all',
          }}
        >
          <span className={`wf-sig ${data?.sigClass || ''}`}>{data?.label}</span>
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

const edgeTypes = { custom: CustomEdge };

export default function WorkflowFlow({ nodes, edges }) {
  return (
    <div className="wf-graph" style={{ width: '100%', height: '100%', minHeight: 360, padding: 0 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        fitViewOptions={{ padding: 0.18 }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        panOnDrag={false}
        panOnScroll={false}
        preventScrolling={false}
        proOptions={{ hideAttribution: true }}
      />
    </div>
  );
}
