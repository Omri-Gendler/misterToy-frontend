import { BarChart } from '@mui/x-charts'
import { PieChart } from '@mui/x-charts/PieChart'
import { AppHeader } from './AppHeader'

export function Dashboard({ toys }) {
    // Aggregate price per label
    const pricePerLabel = {}
    toys.forEach(toy => {
        if (Array.isArray(toy.labels)) {
            toy.labels.forEach(label => {
                pricePerLabel[label] = (pricePerLabel[label] || 0) + toy.price
                console.log('Label:', label, 'Price:', toy.price)
            })
        }
    })

    // Format for PieChart
    const pieData = Object.entries(pricePerLabel).map(([label, price], idx) => ({
        id: idx,
        value: price,
        label,
    }))

    const percentageInStockPerLabel = {}
    toys.forEach(toy => {
        if (Array.isArray(toy.labels)) {
            toy.labels.forEach(label => {
                if (!percentageInStockPerLabel[label]) {
                    percentageInStockPerLabel[label] = { inStock: 0, total: 0 }
                }
                if (toy.inStock) {
                    percentageInStockPerLabel[label].inStock += 1
                }
                percentageInStockPerLabel[label].total += 1
            })
        }
    })

    const labels = Object.keys(percentageInStockPerLabel)
    const percentages = labels.map(label => {
        const { inStock, total } = percentageInStockPerLabel[label]
        return total ? Math.round((inStock / total) * 100) : 0
    })

    return (
        <div>
            {/* <AppHeader /> */}
            <PieChart
                series={[
                    {
                        data: pieData
                    },
                ]}
                width={400}
                height={300}
            />

            <BarChart
                xAxis={[{ data: labels, scaleType: 'band', label: 'Label' }]}
                series={[{ data: percentages, label: '% In Stock' }]}
                height={300}
            />        </div>
    )


}