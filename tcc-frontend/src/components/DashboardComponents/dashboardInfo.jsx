
import "./dashboardInfo.css";
import { BookIcon, InsertIcon, GraficIcon } from "../../assets/icons";
import { BarGrafic, CircleGrafic } from "./grafics"; 

function DashInfo ({dados, graphData}){

    return (
        <>
        <div className="infoMain">

                <div className="divDashInfo">
                    <h3>Total de Relatórios</h3>
                    <div>
                        <h3>{dados.totalRelatorios}</h3>
                        <BookIcon />
                    </div>
                </div>

                <div className="divDashInfo">
                    <h3>Cadastrados Este Ano</h3>
                    <div>
                        <h3>{dados.totalAno}</h3>
                        <InsertIcon />
                    </div>
                </div>

                <div className="divDashInfo">
                    <h3>Ocupação por estante</h3>
                    <div>
                        <h3>{dados.ocupacao} %</h3>
                        <GraficIcon />
                    </div>
                </div>

            </div>


            <DashGraficos graficData={graphData}/>
            <TableActivity/>
        </>


    )
}


function DashGraficos({graficData}){

    return (
        <div className="graficosMain">
          <div className="graficos">
            <BarGrafic data={graficData}/>
          </div>

            <div>
                <CircleGrafic data={graficData}/>
            </div>
            
        
        </div>

    )
}

function TableActivity(){

    return (
        <div className="tableContainer">
  <h3 className="titleTable">Atividade Recente</h3>
  <table className="tabla">
    <thead>
      <tr>
        <th>Data</th>
        <th>Usuário</th>
        <th>Ação Realizada</th>
        <th>ID do TCC</th>
      </tr>
    </thead>
    <tbody>
      {/* Dados fictícios para o teu esqueleto */}
      <tr>
        <td>25/05/2024</td>
        <td>Ladislau Admin</td>
        <td>Cadastrou Novo TCC</td>
        <td>#00125</td>
      </tr>
      <tr>
        <td>25/05/2024</td>
        <td>Ana Costa</td>
        <td>Alterou Localização</td>
        <td>#00098</td>
      </tr>
      <tr>
        <td>24/05/2024</td>
        <td>Ladislau Admin</td>
        <td>Aprovou Relatório</td>
        <td>#00112</td>
      </tr>
      <tr>
        <td>24/05/2024</td>
        <td>Ladislau Admin</td>
        <td>Aprovou Relatório</td>
        <td>#00112</td>
      </tr>
      <tr>
        <td>24/05/2024</td>
        <td>Ladislau Admin</td>
        <td>Aprovou Relatório</td>
        <td>#00112</td>
      </tr>
      <tr>
        <td>24/05/2024</td>
        <td>Ladislau Admin</td>
        <td>Aprovou Relatório</td>
        <td>#00112</td>
      </tr>
      <tr>
        <td>24/05/2024</td>
        <td>Ladislau Admin</td>
        <td>Aprovou Relatório</td>
        <td>#00112</td>
      </tr>
    </tbody>
  </table>
</div>

    )
}


export default DashInfo;