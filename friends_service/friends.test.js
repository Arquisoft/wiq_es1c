const request = require('supertest');
const app = require('./friends');
const {Friendship, FriendRequest } = require("./models");

const validToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiSnVhbmV0ZSJ9.vrEvuxwl7cSg3lGc1M3ZPDTeIIrl9lqMeIMDTUx0OwA";

describe('Friendship API endpoints', () => {
    afterEach(async () => {
        await Friendship.destroy({where: {}});
        await FriendRequest.destroy({where: {}});
    });
    
    describe('sendRequest endpoint', () => {
        it('should return 400 if token is missing', async () => {
            const res = await request(app)
                .post('/api/friends/request/send')
                .send({ to: 'recipient_id' });
            
            expect(res.statusCode).toEqual(401);
        });

        it('should return 400 if recipient ID is missing', async () => {
            const res = await request(app)
                .post('/api/friends/request/send')
                .send({ token: validToken });
            
            expect(res.statusCode).toEqual(400);
        });

        it('should return 400 if friendship already exists', async () => {
            await Friendship.create({
                friend1: "Juanete",
                friend2: "recipient_id"
            });
            
            const res = await request(app)
                .post('/api/friends/request/send')
                .send({ token: validToken, to: 'recipient_id' });
            
            expect(res.statusCode).toEqual(400);
        });

        it('should return 400 if request is already sent', async () => {
            await FriendRequest.create({
                from: "Juanete",
                to: "recipient_id"
            });
            
            const res = await request(app)
                .post('/api/friends/request/send')
                .send({ token: validToken, to: 'recipient_id' });
            
            expect(res.statusCode).toEqual(400);
        });

        it('should send a friend request with valid token and recipient ID', async () => {
            const res = await request(app)
                .post('/api/friends/request/send')
                .send({ token: validToken, to: 'recipient_id' });
            
            expect(res.statusCode).toEqual(200);
        });
    });

    describe('acceptRequest endpoint', () => {
        it('should return 400 if token is missing', async () => {
            const res = await request(app)
                .post('/api/friends/request/accept')
                .send({ to: 'sender_id' });
            
            expect(res.statusCode).toEqual(401);
        });

        it('should return 400 if sender ID is missing', async () => {
            const res = await request(app)
                .post('/api/friends/request/accept')
                .send({ token: validToken });
            
            expect(res.statusCode).toEqual(400);
        });

        it('should return 400 if friend request does not exist', async () => {
            const res = await request(app)
                .post('/api/friends/request/accept')
                .send({ token: validToken, from: 'sender_id' });
            
            expect(res.statusCode).toEqual(400);
        });

        it('should accept a friend request with valid token and sender ID', async () => {
            await FriendRequest.create({
                from: "sender_id",
                to: "Juanete"
            });
            
            const res = await request(app)
                .post('/api/friends/request/accept')
                .send({ token: validToken, from: 'sender_id' });
            
            expect(res.statusCode).toEqual(200);
        });
    });

    describe('getRequests endpoint', () => {
        it('should return 400 if token is missing', async () => {
            const res = await request(app)
                .post('/api/friends/request/');
            
            expect(res.statusCode).toEqual(401);
        });

        it('should return friend requests with valid token', async () => {
            const res = await request(app)
                .post('/api/friends/request/')
                .send({ token: validToken });
            
            expect(res.statusCode).toEqual(200);
        });
    });

    describe('getFriends endpoint', () => {
        it('should return 400 if token is missing', async () => {
            const res = await request(app)
                .post('/api/friends/');
            
            expect(res.statusCode).toEqual(401);
        });
        
        it('should return friends with valid token', async () => {
            const res = await request(app)
                .post('/api/friends/')
                .send({ token: validToken });
            
            expect(res.statusCode).toEqual(200);
        });
    });
});
