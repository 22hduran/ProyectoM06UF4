// DELETE /films/:id
// router.delete('/films/:id', async (req, res) => {
//     const { id } = req.params;
//     try {
//         const result = await client.query('DELETE FROM films WHERE id = $1 RETURNING *', [id]);
//         res.json(result.rows[0]);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });