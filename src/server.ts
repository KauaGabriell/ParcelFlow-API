import { app } from '@/app';

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta: ${PORT}`);
  console.log(`Servidor rodando em: http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
  res.send({ message: 'API is Ok' });
});
