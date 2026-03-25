import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import "./dashboardInfo.css";

function BarGrafic({ data, title }) {

    if (!data?.barData || data.barData.length === 0) return null;

    return (
      <div className="graph-container" style={{width: '100%', height: 300, background: '#fff', padding: '15px', borderRadius: '8px' }}>
       <h4>{title || "Produção de TCCs"}</h4>
        <ResponsiveContainer  width="100%" height="100%" style={{'margin-left': "-15px", padding: '0px'}}>
          <BarChart data={data.barData} >
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="var(--cor-primaria)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
  );

    
}

function CircleGrafic({ data, title, label1, label2 }) {
    if (!data?.circleData || data.circleData.length === 0) return null;

    const COLORS = ['var(--cor-primaria)', 'var(--fundo-escuro)'];

    return (
        <div className="ContainerGraph">
            {/* TÍTULO DINÂMICO */}
            <h4>{title || "Status de Aprovação"}</h4>

            <ResponsiveContainer className="graph">
                <PieChart>
                    <Pie data={data.circleData} /* ... */>
                        {data.circleData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>

            <div style={{ display: "flex", flexDirection: 'column', marginTop: '-30px' }}>
                <div style={{ display: 'flex' }}>
                    <div style={{width: "20px", height: "20px", borderRadius: '50%', background: 'var(--cor-primaria)'}}></div>
                    {/* LEGENDA DINÂMICA */}
                    <span>{label1 || "Aprovado"}</span>
                </div>
                <div style={{ display: 'flex' }}>
                    <div style={{width: "20px", height: "20px", borderRadius: '50%', background: 'var(--fundo-escuro)'}}></div>
                    {/* LEGENDA DINÂMICA */}
                    <span>{label2 || "Reprovado"}</span>
                </div>
            </div>
        </div>
    );
}

export {CircleGrafic, BarGrafic};



