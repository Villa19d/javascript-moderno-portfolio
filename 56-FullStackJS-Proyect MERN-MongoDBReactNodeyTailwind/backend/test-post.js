async function test() {
    try {
        const res = await fetch('https://javascript-moderno-portfolio.onrender.com/api/veterinarios/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: 'test1234567891011@gmail.com',
                password: 'password123'
            })
        });
        const data = await res.json();
        console.log('Success:', res.status, data);
    } catch (err) {
        console.error('Error:', err.message);
    }
}

test();
