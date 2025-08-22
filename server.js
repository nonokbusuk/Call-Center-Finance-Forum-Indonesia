import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

let threads = [
  {
    id: 1,
    title: 'Bagaimana cara keluar dari jeratan pinjol ilegal?',
    content: 'Saya terjebak dengan beberapa pinjaman online ilegal dan sekarang ditagih dengan cara yang tidak wajar...',
    author: 'Anonymous123',
    category: 'Pinjaman Online',
    replies: 23,
    views: 456,
    upvotes: 15,
    downvotes: 2,
    timeAgo: '2 jam lalu',
    isPinned: true,
    lastReply: {
      author: 'FinancialAdvisor',
      timeAgo: '30 menit lalu'
    }
  },
  {
    id: 2,
    title: 'Review Bank Digital Jenius vs Bank Jago - Mana yang lebih baik?',
    content: 'Mau pindah ke bank digital, bingung pilih antara Jenius dan Bank Jago. Ada yang punya pengalaman?',
    author: 'DigitalBanker',
    category: 'Perbankan',
    replies: 18,
    views: 892,
    upvotes: 24,
    downvotes: 1,
    timeAgo: '4 jam lalu',
    isPinned: false,
    lastReply: {
      author: 'BankExpert',
      timeAgo: '1 jam lalu'
    }
  },
  {
    id: 3,
    title: 'Tips investasi saham untuk gaji UMR',
    content: 'Dengan gaji UMR, apakah masih bisa investasi saham? Berapa minimal yang harus dialokasikan?',
    author: 'NewInvestor',
    category: 'Investasi',
    replies: 31,
    views: 1250,
    upvotes: 42,
    downvotes: 3,
    timeAgo: '6 jam lalu',
    isPinned: false,
    lastReply: {
      author: 'StockGuru',
      timeAgo: '2 jam lalu'
    }
  }
];

// GET list threads
app.get('/api/forum', (req, res) => {
  res.json(threads);
});

// POST new thread
app.post('/api/forum', (req, res) => {
  const { title, content, author, category } = req.body;
  const newThread = {
    id: threads.length ? threads[threads.length - 1].id + 1 : 1,
    title,
    content,
    author,
    category,
    replies: 0,
    views: 0,
    upvotes: 0,
    downvotes: 0,
    timeAgo: 'baru saja',
    isPinned: false,
    lastReply: null
  };
  threads.push(newThread);
  res.status(201).json(newThread);
});

// upvote
app.post('/api/forum/:id/upvote', (req, res) => {
  const id = Number(req.params.id);
  const thread = threads.find(t => t.id === id);
  if (!thread) return res.status(404).json({ message: 'Thread not found' });
  thread.upvotes += 1;
  res.json(thread);
});

// downvote
app.post('/api/forum/:id/downvote', (req, res) => {
  const id = Number(req.params.id);
  const thread = threads.find(t => t.id === id);
  if (!thread) return res.status(404).json({ message: 'Thread not found' });
  thread.downvotes += 1;
  res.json(thread);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
