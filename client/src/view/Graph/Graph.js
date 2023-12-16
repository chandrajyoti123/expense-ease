
import {
    PieChart,
    Pie,
    Tooltip,
    BarChart,
    XAxis,
    YAxis,
    Legend,
    CartesianGrid,
    Bar,
} from "recharts";
import SideBar from "../../components/SideBar/SideBar";

export default function Graph() {
    const data = [
        { name: "credit", amount: 2000 },
        { name: "debit", amount: 10000 },
        // { name: "Twiter", users: 1000000000 },
        // { name: "Telegram", users: 500000000 },
    ];
    return (
        <>
            <div className='main-container' >


                <SideBar />
                <div className='sub-container'>
                <div style={{ textAlign: "center" }}>
                    <h1>Socail Media Users</h1>
                    <div className="App">
                        <PieChart width={500} height={500}>
                            <Pie
                                dataKey="amount"
                                isAnimationActive={false}
                                data={data}
                                cx={200}
                                cy={200}
                                outerRadius={80}
                                fill="#8884d8"
                                label
                            />
                            <Tooltip />
                        </PieChart>

                    </div>
                </div>
                </div>
            </div>
        </>
    )
}
