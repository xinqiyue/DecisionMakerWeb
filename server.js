const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

// Initialize the database
const db = new sqlite3.Database('decisions.db', (err) => {
    if (err) return console.error('Database error:', err);
    console.log('Connected to SQLite database.');

    // Create decisions table
    db.run(`CREATE TABLE IF NOT EXISTS decisions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
    )`);

    // Create options table
    db.run(`CREATE TABLE IF NOT EXISTS options (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        text TEXT NOT NULL,
        decision_id INTEGER NOT NULL,
        FOREIGN KEY (decision_id) REFERENCES decisions (id) ON DELETE CASCADE
    )`);
});

// Get all decisions
app.get('/api/decisions', (req, res) => {
    db.all('SELECT * FROM decisions', (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Create a new decision with a default option
app.post('/api/decisions', (req, res) => {
    const { name } = req.body;
    db.run(`INSERT INTO decisions (name) VALUES (?)`, [name], function (err) {
        if (err) return res.status(500).json({ error: err.message });

        const decisionId = this.lastID;
        db.run(`INSERT INTO options (text, decision_id) VALUES (?, ?)`, [name, decisionId], (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: decisionId, name });
        });
    });
});

// Delete a decision and its options
app.delete('/api/decisions/:id', (req, res) => {
    const { id } = req.params;
    db.run(`DELETE FROM decisions WHERE id = ?`, [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Decision deleted' });
    });
});

// Get options for a decision
app.get('/api/decisions/:id/options', (req, res) => {
    const { id } = req.params;
    db.all('SELECT * FROM options WHERE decision_id = ?', [id], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Create a new option for a decision
app.post('/api/decisions/:id/options', (req, res) => {
    const { id } = req.params; // The decision id
    const { text } = req.body; // The option text

    if (!text) {
        return res.status(400).json({ error: 'Option text cannot be empty' });
    }

    // Insert the new option into the database
    db.run(`INSERT INTO options (text, decision_id) VALUES (?, ?)`, [text, id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id: this.lastID, text, decision_id: id });
    });
});

// Update an option
app.put('/api/options/:id', (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    db.run(`UPDATE options SET text = ? WHERE id = ?`, [text, id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Option updated' });
    });
});

// Delete an option if more than one option exists
app.delete('/api/options/:id', (req, res) => {
    const { id } = req.params;
    db.get('SELECT decision_id FROM options WHERE id = ?', [id], (err, row) => {
        if (err || !row) return res.status(500).json({ error: 'Option not found' });

        db.all('SELECT COUNT(*) AS count FROM options WHERE decision_id = ?', [row.decision_id], (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });

            const count = rows[0].count;
            if (count > 1) {
                db.run(`DELETE FROM options WHERE id = ?`, [id], (err) => {
                    if (err) return res.status(500).json({ error: err.message });
                    res.json({ message: 'Option deleted' });
                });
            } else {
                res.status(400).json({ error: 'Cannot delete the only option' });
            }
        });
    });
});

// Get a random option from a decision
app.get('/api/decisions/:id/random', (req, res) => {
    const { id } = req.params;
    db.all('SELECT * FROM options WHERE decision_id = ?', [id], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        if (rows.length === 0) return res.json(null);

        const randomOption = rows[Math.floor(Math.random() * rows.length)];
        res.json(randomOption);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
