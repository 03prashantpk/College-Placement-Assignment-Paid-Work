import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import './Custom.css';

function App() {
  const [wordFrequencies, setWordFrequencies] = useState([]);
  const [csvData, setCsvData] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isChartGenerated, setIsChartGenerated] = useState(false);

  useEffect(() => {
    // Generate chart on component mount
    generateChart();
  }, [wordFrequencies]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('https://www.terriblytinytales.com/test.txt');
      const text = await response.text();
      const wordCount = {};
      const words = text.split(/\W+/);

      // Calculate word frequencies
      words.forEach((word) => {
        if (word.trim() !== '') {
          wordCount[word] = (wordCount[word] || 0) + 1;
        }
      });

      // Sort word frequencies in descending order
      const sortedFrequencies = Object.entries(wordCount).sort(
        (a, b) => b[1] - a[1]
      );

      // Select the top 20 most occurring words
      const topTwentyWords = sortedFrequencies.slice(0, 20);

      // Prepare CSV data
      const csvContent = `Word,Frequency\n${topTwentyWords
        .map(([word, frequency]) => `"${word}",${frequency}`)
        .join('\n')}`;

      // Update state with word frequencies and CSV data
      setWordFrequencies(topTwentyWords);
      setCsvData(csvContent);
      setIsChartGenerated(true);
    } catch (error) {
      console.error('Error fetching or processing data:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateChart = () => {
    if (wordFrequencies.length === 0) return;
  
    const labels = wordFrequencies.map(([word]) => word);
    const data = wordFrequencies.map(([, frequency]) => frequency);
    const backgroundColors = generateBackgroundColors(wordFrequencies.length);
  
    // Create a chart
    const ctx = document.getElementById('chart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Word Frequency',
            data,
            backgroundColor: backgroundColors,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            precision: 0,
          },
        },
      },
    });
  };
  
  const generateBackgroundColors = (count) => {
    const colors = [];
    const hueStep = 360 / count;
  
    for (let i = 0; i < count; i++) {
      const hue = i * hueStep;
      const color = `hsl(${hue}, 70%, 50%)`;
      colors.push(color);
    }
  
    return colors;
  };
  

  const handleExportButtonClick = () => {
    setIsExporting(true);
    // Create a temporary <a> element to initiate CSV download
    const link = document.createElement('a');
    link.href = `data:text/csv;charset=utf-8,${encodeURIComponent(csvData)}`;
    link.download = 'word_frequencies.csv';
    link.click();
    setIsExporting(false);
  };

  return (
    <div>
      <div className='Buttons'>
        <form onSubmit={handleFormSubmit}>
          <button type="submit" disabled={isSubmitting || isChartGenerated}>
            {isSubmitting ? 'Please wait...' : 'Submit'}      </button>
        </form>
        <button onClick={handleExportButtonClick} disabled={isExporting}>
          {isExporting ? 'Downloading...' : 'Export'}
        </button>
      </div>
      {wordFrequencies.length > 0 && (
      <div className='table-outer'>
        <h2>Word Frequencies</h2>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Word</th>
              <th>Frequency</th>
            </tr>
          </thead>
        <tbody>
          {wordFrequencies.map(([word, frequency], index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{word}</td>
              <td>{frequency}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='Chart-Outer'>
        <h2>Chart</h2>
        <canvas id="chart"></canvas>
      </div>
    </div>
  )}
</div>
);
}

export default App;
