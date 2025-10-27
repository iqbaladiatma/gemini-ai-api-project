import 'dotenv/config'
import express from 'express'
import multer from 'multer'
import fs from 'fs'
import { GoogleGenAi } from '@google/genai'

const app = express()
const upload = multer()
const ai = new GoogleGenAi({
    apiKey: process.env.GEMINI_API_KEY
})

const GEMINI_MODEL = 'gemini-2.5-flash'

app.use(express.json())

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

app.post('/upload', upload.single('file'), async (req, res) => {
    const { file } = req.body
    try {
        const response = await ai.generateContent({
            model: GEMINI_MODEL,
            prompt: 'Extract text from the uploaded image',
            image: file.buffer
        })
        res.json({
            text: response.text()
        })
    } catch (error) {
        console.error('Error:', error)
        res.status(500).json({ error: 'An error occurred' })
    }
});
app.post('/generate-from-image', async (req, res) => {
    const { imageUrl } = req.body
    try {
        const response = await ai.generateContent({
            model: GEMINI_MODEL,
            prompt: 'Extract text from the uploaded image',
            image: imageUrl
        })
        res.json({
            text: response.text()
        })
    } catch (error) {
        console.error('Error:', error)
        res.status(500).json({ error: 'An error occurred' })
    }
})

app.post('/generate-from-text', async (req, res) => {
    const { text } = req.body
    try {
        const response = await ai.generateContent({
            model: GEMINI_MODEL,
            prompt: text
        })
    } catch (error) {
        console.error('Error:', error)
        res.status(500).json({ error: 'An error occurred' })
    }
})

app.post('/generate-from-document', async (req, res) => {
    const { document } = req.body
    try {
        const response = await ai.generateContent({
            model: GEMINI_MODEL,
            prompt: document
        })
    } catch (error) {
        console.error('Error:', error)
        res.status(500).json({ error: 'An error occurred' })
    }
})
app.post('/generate-from-audio', async (req, res) => {
    const { audioUrl } = req.body
    try {
        const response = await ai.generateContent({
            model: GEMINI_MODEL,
            prompt: audioUrl
        })
    } catch (error) {
        console.error('Error:', error)
        res.status(500).json({ error: 'An error occurred' })
    }
})

