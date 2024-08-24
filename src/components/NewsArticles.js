import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Input, Checkbox, Spin, Typography } from 'antd';
import 'antd/dist/reset.css';

const { Search } = Input;

function NewsArticles() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSources, setSelectedSources] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/articles');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result);
                setFilteredData(result);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        filterData();
    }, [searchTerm, selectedSources]);

    const filterData = () => {
        let filtered = data;
        if (searchTerm) {
            filtered = filtered.filter((item) =>
                item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.abstract.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedSources.length > 0) {
            filtered = filtered.filter((item) =>
                selectedSources.includes(item.source)
            );
        }

        setFilteredData(filtered);
    };

    const handleSearch = (value) => {
        setSearchTerm(value);
    };

    const handleSourceChange = (checkedValues) => {
        setSelectedSources(checkedValues);
    };

    if (loading) {
        return <Spin tip="Loading..." />;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div style={{ padding: '20px' }}>
            <h1>News Articles</h1>
            <div style={{ marginBottom: '20px' }}>
                <div>
                    <Search
                        placeholder="Search articles"
                        enterButton="Search"
                        onSearch={handleSearch}
                        style={{ width: 300, marginRight: 20 }}
                    />
                </div>
                <div style={{ marginTop: '20px', display:'flex', justifyContent:'center' }}>
                    <Typography>Source :</Typography>
                    <Checkbox.Group
                        options={['New York Times', 'BBC News']}
                        onChange={handleSourceChange}
                        style={{ marginLeft: 20 }}
                    />
                </div>
            </div>
            {filteredData.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '20px' }}>
                    <Typography.Paragraph>No data available</Typography.Paragraph>
                </div>
            ) : (
                <Row gutter={[16, 16]}>
                    {filteredData.map((item) => (
                        <Col key={item.id} xs={24} sm={12} md={8} lg={6}>
                            <Card
                                style={{ width: '300px', height: '400px', overflow:'hidden' }}
                                hoverable
                                cover={<img  style={{ 
                                    width: '300px', 
                                    height: '200px', 
                                    objectFit: 'cover' 
                                }}  alt={item.title} src={item.mediaUrl || 'https://via.placeholder.com/300'} />}
                            >
                                <Card.Meta title={item.title} description={item.byline} />
                                <p>{item.abstract}</p>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </div>
    );
}

export default NewsArticles;
